import React, { useState } from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

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

const HeroGenerator = () => {
  const [form] = Form.useForm();
  const [heroJson, setHeroJson] = useState(undefined);
  const [attackRange, setAttackRange] = useState(
    new Array(9).fill(new Array(9).fill(false))
  );

  const [purifyRange, setPurifyRange] = useState(
    new Array(9).fill(new Array(9).fill(false))
  );

  const onClickAttackRange = (x, y) => {
    let tmp = [...attackRange];
    let tmp2 = [...tmp[y]];
    tmp2[x] = !attackRange[y][x];
    tmp[y] = tmp2;
    setAttackRange(tmp);
  };

  const onClickPurifyRange = (x, y) => {
    let tmp = [...purifyRange];
    let tmp2 = [...tmp[y]];
    tmp2[x] = !purifyRange[y][x];
    tmp[y] = tmp2;
    setPurifyRange(tmp);
  };

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
    setHeroJson({
      name,
      model,
      stats: {
        hp,
        attack,
        SP,
        cooldown,
        redeployTime,
        respawnTime,
        attackUp: convert2Dto1D(attackRange),
        purifyGroundsUp: convert2Dto1D(purifyRange),
      },
    });
  };

  return (
    <>
      <Form {...layout} layout={'horizontal'} form={form} onFinish={onFinish}>
        <Form.Item label='Name' name='name'>
          <Input placeholder={`Hero's name`} />
        </Form.Item>
        <Form.Item label='Prefab' name='model'>
          <Input placeholder={`Model's name`} />
        </Form.Item>
        <Form.Item label='HP' name='hp'>
          <InputNumber placeholder={`Hero's HP`} />
        </Form.Item>
        <Form.Item label='Attack' name='attack'>
          <InputNumber placeholder={`Attack damage`} />
        </Form.Item>
        <Form.Item label='SP' name='SP'>
          <InputNumber placeholder={`SP cost`} />
        </Form.Item>
        <Form.Item label='Cooldown' name='cooldown'>
          <InputNumber placeholder={`Cooldown`} />
        </Form.Item>
        <Form.Item label='Redeploy Time' name='redeployTime'>
          <InputNumber placeholder={`Redeploy time`} />
        </Form.Item>
        <Form.Item label='Respawn Time' name='respawnTime'>
          <InputNumber placeholder={`Respawn time`} />
        </Form.Item>
        <Form.Item label='Attack Range' name='attackRange' {...attackLayout}>
          <div style={{}}>
            {attackRange.map((d, i) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {d.map((data, k) => (
                    <div
                      style={{
                        ...styles.cell,
                        backgroundColor:
                          (k === 4) & (i === 4)
                            ? '#ffc069'
                            : data
                            ? '#69c0ff'
                            : '#f0f0f0',
                      }}
                      onClick={() => {
                        if (k !== 4 || i !== 4) {
                          onClickAttackRange(k, i);
                        }
                      }}
                    ></div>
                  ))}
                </div>
              );
            })}
          </div>
        </Form.Item>
        <Form.Item label='Purify Range' name='purifyRange' {...attackLayout}>
          <div style={{}}>
            {purifyRange.map((d, i) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {d.map((data, k) => (
                    <div
                      style={{
                        ...styles.cell,
                        backgroundColor:
                          (k === 4) & (i === 4)
                            ? '#ffc069'
                            : data
                            ? '#69c0ff'
                            : '#f0f0f0',
                      }}
                      onClick={() => {
                        if (k !== 4 || i !== 4) {
                          onClickPurifyRange(k, i);
                        }
                      }}
                    ></div>
                  ))}
                </div>
              );
            })}
          </div>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <TextArea value={JSON.stringify(heroJson)} />
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

export default HeroGenerator;
