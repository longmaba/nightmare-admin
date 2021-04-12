import React, { useState } from 'react';

import { Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const colors = [
  '#f0f0f0',
  '#876800',
  '#876800',
  '#d46b08',
  '#d46b08',
  '#262626',
  '#9254de',
  '#13c2c2',
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

  for (var i = 0; i < array.length; i++) {
    newArr = newArr.concat(array[i]);
  }

  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = newArr[i] ? 1 : 0;
  }

  return newArr;
};

const LevelEditor = () => {
  const [form] = Form.useForm();
  const [levelJSON, setLevelJSON] = useState(undefined);
  const [terrainData, setTerrainData] = useState(
    new Array(9).fill(new Array(12).fill(0))
  );
  const [monsterPath, setMonsterPath] = useState(
    new Array(9).fill(new Array(12).fill(0))
  );

  const [paths, setPaths] = useState([]);

  const [protectorStone, setProtectorStone] = useState([]);
  const [monsterGate, setMonsterGate] = useState([]);

  const onFinish = (values) => {
    const {
      name,
      model,
      hp,
      attack,
      SP,
      cooldown,
      redeployTime,
      respawnTime,
    } = values;
    setLevelJSON({
      name,
      model,
      stats: {
        hp,
        attack,
        SP,
        cooldown,
        redeployTime,
        respawnTime,
      },
    });
  };

  const onClickLevelRange = (x, y) => {
    let tmp = [...terrainData];
    let tmp2 = [...tmp[y]];
    if (terrainData[y][x] == 0) {
      tmp2[x] = terrainData[y][x] + 1;
    } else if (terrainData[y][x] === 5) {
      // Monster Gate
      tmp2[x] = 6;
      let monsterTmp = monsterGate;
      monsterTmp.push({ x, y: monsterPath.length - 1 - y });
      setMonsterGate(monsterTmp);
    } else if (terrainData[y][x] === 6) {
      tmp2[x] = 7;
      let monsterRemoved = monsterGate.filter(
        (d) => d.x !== x && d.y !== monsterPath.length - 1 - y
      );
      console.log('abc');
      console.log(monsterRemoved);
      setMonsterGate(monsterRemoved);
      let protectTmp = protectorStone;
      protectTmp.push({ x, y: monsterPath.length - 1 - y });
      setProtectorStone(protectTmp);
    } else if (terrainData[y][x] >= 7) {
      let protectorRemoved = protectorStone.filter(
        (d) => d.x !== x && d.y !== monsterPath.length - 1 - y
      );
      setProtectorStone(protectorRemoved);
      tmp2[x] = 0;
    } else {
      tmp2[x] = terrainData[y][x] + 2;
    }
    tmp[y] = tmp2;
    setTerrainData(tmp);
  };

  const onClickMonsterPath = (x, y) => {
    let tmpPaths = paths;
    tmpPaths.push({ x, y: monsterPath.length - 1 - y });
    setPaths(tmpPaths);
    let tmp = [...monsterPath];
    let tmp2 = [...tmp[y]];
    tmp2[x] = tmpPaths.length;
    tmp[y] = tmp2;
    setMonsterPath(tmp);
  };

  const onClickGoal = (x, y) => {
    let tmp = [...terrainData];
    let tmp2 = [...tmp[y]];
    setProtectorStone({ x, y });
  };

  const clearPaths = () => {
    setMonsterPath(new Array(9).fill(new Array(12).fill(0)));
    setPaths([]);
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
                            console.log(protectorStone);
                            console.log(monsterGate);
                          }}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div style={{ marginLeft: 40 }}>
              <div>
                <div
                  style={{ ...styles.cell, backgroundColor: colors[0] }}
                ></div>
                Empty Tile
              </div>
              <div>
                <div
                  style={{ ...styles.cell, backgroundColor: colors[1] }}
                ></div>
                Low Ground
              </div>
              <div>
                <div
                  style={{ ...styles.cell, backgroundColor: colors[3] }}
                ></div>
                High Ground
              </div>
              <div>
                <div
                  style={{ ...styles.cell, backgroundColor: colors[5] }}
                ></div>
                Wall
              </div>
              <div>
                <div
                  style={{ ...styles.cell, backgroundColor: colors[7] }}
                ></div>
                Protector Stone
              </div>
              <div>
                <div
                  style={{ ...styles.cell, backgroundColor: colors[6] }}
                ></div>
                Monster Gate
              </div>
            </div>
          </div>
        </Form.Item>
        <Form.Item label='Goal and Start' name='terrainData' {...attackLayout}>
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
                            onClickGoal(k, i);
                          }}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </Form.Item>
        <Form.Item label='Mob Waves' name='mobs'>
          <Form.Item label='Name'>
            <Input placeholder={`Monster's name`} />
          </Form.Item>

          <Form.Item label='Amount'>
            <Input placeholder={`Amount`} />
          </Form.Item>

          <Form.Item label='Begin At'>
            <Input placeholder={`Start`} />
          </Form.Item>

          <Form.Item label='Paths'>
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
                          onClickMonsterPath(k, i);
                          console.log(paths);
                        }}
                      >
                        {monsterPath[i][k] !== 0
                          ? monsterPath[i][k]
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
              clearPaths();
            }}
          >
            Clear
          </Button>
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
