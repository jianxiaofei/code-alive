import React, { useState } from 'react';
import { Space, Button, Modal, Image } from 'antd';
import './index.less';
import TalbeList from './TableList';

/**
 * 复用点击按钮
 * @param {*} props
 * @returns
 */
function CButton(props) {
  const { name } = props;
  const [status, setStatus] = useState('');
  const bg = status === 'hover' ? name + '_bg' : name;
  return (
    <Button
      onClick={() => props.click()}
      onMouseLeave={() => setStatus('')}
      onMouseEnter={() => setStatus('hover')}
      style={{ background: 'url(' + require('./img/btn_' + bg + '.png') + ')' }}
    >
      &nbsp;
    </Button>
  );
}

/**
 * 分类课堂
 * @param {*} props
 * @returns
 */
function Classification(props) {
  const [page, setPage] = useState(1);
  const hide = () => props.hide();
  const prevPage = () => {
    let num = page;
    setPage(Math.max(1, --num));
  };
  const nextPage = () => {
    let num = page;
    setPage(Math.min(3, ++num));
  };
  return (
    <Modal width="90%" className="classification-modal" title="分类课堂" visible={props.open} onCancel={hide} onOk={hide}>
      <Image className="img-wrap" preview={false} src={require(`./img/detail${page}.png`)} />
      <Space>
        <Button disabled={page === 1} onClick={prevPage}>
          上一页
        </Button>
        <Button disabled={page === 3} onClick={nextPage}>
          下一页
        </Button>
      </Space>
    </Modal>
  );
}

/**
 * 活动规则
 * @param {*} props
 * @returns
 */
function Rule(props) {
  const hide = () => props.hide();
  return (
    <Modal width="90%" className="rule-modal" title="活动规则" visible={props.open} onCancel={hide} onOk={hide}>
      <Image className="img-wrap" preview={false} src={require(`./img/rule_bg.png`)} />
    </Modal>
  );
}

/**
 * 中奖名单
 * @param {*} props
 * @returns
 */
function List(props) {
  const hide = () => props.hide();
  return (
    <Modal width="90%" className="list-modal" title="中奖名单" visible={props.open} onCancel={hide} onOk={hide}>
      <TalbeList />
    </Modal>
  );
}

function GarbageClassification() {
  const [modalName, setModal] = useState('');
  return (
    <div className="game-page-root">
      <div className="top-wrap">
        <Space direction="vertical">
          <CButton name="classification" click={() => setModal('classification')} />
          <CButton name="deal" />
        </Space>
        <Space direction="vertical">
          <CButton name="back" />
          <CButton name="rule" click={() => setModal('rule')} />
          <CButton name="changePrice" />
          <CButton name="list" click={() => setModal('list')} />
        </Space>
      </div>
      <div className="game-btn-wrap">
        <CButton name="game1" />
        <CButton name="game2" />
        <CButton name="game3" />
      </div>
      <div className="video-btn-wrap">
        <CButton name="video" />
        <CButton name="video" />
        <CButton name="video" />
        <CButton name="video" />
      </div>
      <p>
        分类次数 <span>3</span>
      </p>
      <Classification open={modalName === 'classification'} hide={() => setModal('')} />
      <Rule open={modalName === 'rule'} hide={() => setModal('')} />
      <List open={modalName === 'list'} hide={() => setModal('')} />
    </div>
  );
}

export default GarbageClassification;
