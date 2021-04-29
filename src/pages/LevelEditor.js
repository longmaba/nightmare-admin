import React, { useState } from 'react';

import { Form, Input, Button, Radio, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Title } = Typography;

const colors = [
  '#1f1f1f',
  '#ffffff',
  '#ffffff',
  '#d9d9d9',
  '#d9d9d9',
  '#faad14',
  '#cf1322',
  '#1890ff',
];

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 4 },
};

const buttonItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 2,
  },
};

const attackLayout = {
  wrapperCol: {
    span: 14,
  },
};

const convert2Dto1D = (array) => {
  let newArr = [];
  console.log(array);
  for (var i = 0; i < array.length; i++) {
    for (let k = 0; k < array[i].length; k++) {
      if (array[i][k] === 7 || array[i][k] === 6) {
        newArr.push(1);
      } else {
        newArr.push(array[i][k]);
      }
    }
  }
  return newArr;
};

const reverseArray = (array) => {
  let cloneArr = [];
  for (let i = 0; i < array.length; i++) {
    cloneArr.push(array[array.length - 1 - i]);
  }
  return cloneArr;
};

const LevelEditor = () => {
  const [form] = Form.useForm();
  const [levelJSON, setLevelJSON] = useState(undefined);
  const [terrainData, setTerrainData] = useState(
    new Array(9).fill(new Array(12).fill(1))
  );

  const [protectorStone, setProtectorStone] = useState([]);
  const [monsterGate, setMonsterGate] = useState([]);
  const [selectedTerrain, setSelectedTerrain] = useState(1);
  const [mobWave, setMobWave] = useState([
    {
      name: 'Enemy',
      amount: 0,
      interval: 0,
      beginAt: 0,
      paths: [],
      monsterPaths: new Array(9).fill(new Array(12).fill(0)),
    },
  ]);

  const onFinish = (values) => {
    const { width, height, core } = values;
    setLevelJSON({
      width,
      height,
      core,
      terrainData: convert2Dto1D(reverseArray(terrainData)),
      monsterGate,
      protectorStone,
      mobWave: mobWave.map(({ monsterPaths, ...rest }) => rest),
    });
  };

  // TODO: 123

  const onClickLevelRange = (x, y) => {
    let tmp = [...terrainData];
    let tmp2 = [...tmp[y]];
    if (terrainData[y][x] === selectedTerrain) {
      tmp2[x] = 1;
      if (selectedTerrain === 7) {
        let protectTmp = protectorStone;
        let protectorRemoved = protectTmp.filter(
          (d) => !(d.x === x && d.y === terrainData.length - 1 - y)
        );
        setProtectorStone(protectorRemoved);
      }
      if (selectedTerrain === 6) {
        let monsterTmp = monsterGate;
        let monsterRemoved = monsterTmp.filter(
          (d) => !(d.x === x && d.y === terrainData.length - 1 - y)
        );
        setMonsterGate(monsterRemoved);
      }
    } else {
      tmp2[x] = selectedTerrain;
      if (selectedTerrain === 7) {
        // Protector Stone
        let protectTmp = protectorStone;
        protectTmp.push({ x, y: terrainData.length - 1 - y });
        setProtectorStone(protectTmp);
      }

      if (selectedTerrain === 6) {
        // Monster Gate
        let monsterTmp = monsterGate;
        monsterTmp.push({ x, y: terrainData.length - 1 - y });
        setMonsterGate(monsterTmp);
      }
    }
    tmp[y] = tmp2;
    setTerrainData(tmp);
  };

  const onClickMonsterPath = (x, y, i) => {
    let tmpWave = [...mobWave];
    let tmpPaths = tmpWave[i].paths;
    tmpPaths.push({ x, y: terrainData.length - 1 - y });
    tmpWave[i].paths = tmpPaths;
    let tmp = [...tmpWave[i].monsterPaths];
    let tmp2 = [...tmp[y]];
    tmp2[x] = tmpPaths.length;
    tmp[y] = tmp2;
    tmpWave[i].monsterPaths = tmp;
    setMobWave(tmpWave);
  };

  const clearPaths = (i) => {
    let clearMonsterPath = new Array(9).fill(new Array(12).fill(0));
    let paths = [];
    let tmpWave = [...mobWave];
    tmpWave[i].monsterPaths = clearMonsterPath;
    tmpWave[i].paths = paths;
    setMobWave(tmpWave);
  };

  const onClickAddNewWave = () => {
    let tmpWave = [...mobWave];
    tmpWave.push({
      name: 'Enemy',
      amount: 0,
      interval: 0,
      beginAt: 0,
      paths: [],
      monsterPaths: new Array(9).fill(new Array(12).fill(0)),
    });
    setMobWave(tmpWave);
  };

  const onClickRemoveWave = (i) => {
    let tmpWave = [...mobWave];
    let filtered = tmpWave.filter((value, index) => index !== i);
    setMobWave(filtered);
  };

  const onEditingMobWave = (e, i) => {
    let tmpWave = [...mobWave];
    tmpWave[i][e.target.attributes.label.value] = e.target.value;
    setMobWave(tmpWave);
  };

  return (
    <>
      <Form {...layout} layout={'horizontal'} form={form} onFinish={onFinish}>
        <Form.Item label='Width' name='width'>
          <Input placeholder={`Level's width`} />
        </Form.Item>
        <Form.Item label='Height' name='height'>
          <Input placeholder={`Level's height`} />
        </Form.Item>
        <Form.Item label='Core' name='core'>
          <Input placeholder={`Core's number`} />
        </Form.Item>
        <Form.Item label='Level Map' name='terrainData' {...attackLayout}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              {terrainData.map((d, i) => {
                return (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {d.map((data, k) => {
                      let backgroundColor = colors[data];
                      return (
                        <div
                          style={{
                            ...styles.cell,
                            backgroundColor,
                          }}
                          onClick={() => {
                            onClickLevelRange(k, i);
                          }}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div style={{ marginLeft: 40, maxWidth: 200 }}>
              <Radio.Group
                onChange={(e) => setSelectedTerrain(parseInt(e.target.value))}
              >
                <Radio value='0'>
                  {' '}
                  <div
                    style={{ ...styles.cell, backgroundColor: colors[0] }}
                  ></div>
                  Abyss
                </Radio>
                <Radio value='1'>
                  {' '}
                  <div
                    style={{ ...styles.cell, backgroundColor: colors[1] }}
                  ></div>
                  Low Ground
                </Radio>
                <Radio value='3'>
                  {' '}
                  <div
                    style={{ ...styles.cell, backgroundColor: colors[3] }}
                  ></div>
                  High Ground
                </Radio>
                <Radio value='5'>
                  {' '}
                  <div
                    style={{ ...styles.cell, backgroundColor: colors[5] }}
                  ></div>
                  Wall
                </Radio>
                <Radio value='7'>
                  {' '}
                  <div
                    style={{ ...styles.cell, backgroundColor: colors[7] }}
                  ></div>
                  Protector Stone
                </Radio>
                <Radio value='6'>
                  {' '}
                  <div
                    style={{ ...styles.cell, backgroundColor: colors[6] }}
                  ></div>
                  Monster Gate
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </Form.Item>
        <Form.Item label='Mob Waves' name='mobs' {...attackLayout}>
          {mobWave.map((wave, i) => {
            return (
              <>
                {' '}
                <Title level={5}>Wave {i + 1}</Title>
                <Form.Item label='Name'>
                  <Input
                    placeholder={`Monster's name`}
                    label='name'
                    onChange={(e) => onEditingMobWave(e, i)}
                  />
                </Form.Item>
                <Form.Item label='Amount'>
                  <Input
                    placeholder={`Amount`}
                    label='amount'
                    onChange={(e) => onEditingMobWave(e, i)}
                  />
                </Form.Item>
                <Form.Item label='Interval'>
                  <Input
                    placeholder={`Interval`}
                    label='interval'
                    onChange={(e) => onEditingMobWave(e, i)}
                  />
                </Form.Item>
                <Form.Item label='Begin At'>
                  <Input
                    placeholder={`Start`}
                    label='beginAt'
                    onChange={(e) => onEditingMobWave(e, i)}
                  />
                </Form.Item>
                <Form.Item label='Paths'>
                  {terrainData.map((d, y) => {
                    return (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {d.map((data, x) => {
                          let backgroundColor = colors[data];
                          return (
                            <div
                              style={{
                                ...styles.cell,
                                backgroundColor,
                              }}
                              onClick={() => {
                                onClickMonsterPath(x, y, i);
                              }}
                            >
                              {wave.monsterPaths[y][x] !== 0
                                ? wave.monsterPaths[y][x]
                                : undefined}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </Form.Item>
                <Button
                  style={{ marginTop: 20 }}
                  type='primary'
                  onClick={() => {
                    clearPaths(i);
                  }}
                >
                  Clear
                </Button>
                {mobWave.length > 1 && (
                  <Button
                    style={{ marginTop: 20, marginLeft: 20 }}
                    type='primary'
                    onClick={() => {
                      onClickRemoveWave(i);
                    }}
                  >
                    Remove Wave
                  </Button>
                )}
              </>
            );
          })}
          <Form.Item>
            <Button
              style={{ marginTop: 20 }}
              type='primary'
              onClick={() => onClickAddNewWave()}
            >
              Add New Wave
            </Button>
          </Form.Item>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <TextArea value={JSON.stringify(levelJSON)} />
    </>
  );
};

const styles = {
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    backgroundColor: 'white',
    border: '1px dashed rgba(1, 1, 1, .35)',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'default',
  },
};

export default LevelEditor;
