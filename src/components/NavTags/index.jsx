import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Tag, Dropdown, Menu } from 'antd';
import PubSub from 'pubsub-js';
import { DownOutlined } from '@ant-design/icons';
import './index.less';

export default function NavTag() {
  const pathname = useLocation();
  const navigate = useNavigate();
  const [tagList, setTagList] = useState([]);
  const [currentTag, setCurrentTag] = useState();

  // 点击标签
  const handleClickTag = key => {
    setCurrentTag({ ...currentTag, key });
    PubSub.publish('change-tags', key);
  };

  // 增加标签
  const addTag = currMenu => {
    const existTag = tagList.find(v => v.key === currMenu.key);

    setTagList(existTag ? tagList : [...tagList, currMenu]);
    setCurrentTag(currMenu);
  };

  // 关闭标签
  const closeTag = item => {
    const currIdx = tagList.findIndex(v => v.key === item.key);
    const linkTag = tagList[currIdx > 0 ? currIdx - 1 : 0];

    if (item.key === currentTag.key) {
      setCurrentTag(linkTag);
      navigate(linkTag?.url || '/', { replace: true });
      PubSub.publish('change-tags', linkTag?.key);
    }
    setTagList(tagList.filter(v => v.key !== item.key));
  };

  // 集中行为标签
  const handleTriggerTagAction = e => {
    if (tagList.length === 0) return;
    const idx = tagList.findIndex(j => j.key === currentTag.key);

    switch (e.key) {
      case '0':
        closeTag(currentTag);
        break;
      case '1':
        setTagList(tagList.filter((v, i) => i >= idx));
        break;
      case '2':
        setTagList(tagList.filter((v, i) => i <= idx));
        break;
      case '3':
        setTagList([]);
        navigate('/', { replace: true });
        PubSub.publish('change-tags', []);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    PubSub.subscribe('menu-selected', (_, tag) => addTag(tag));
    return () => PubSub.unsubscribe('menu-selected');
  }, [pathname]);

  return (
    <div className="ant-tags-wrap">
      <div className="tags-content-wrap">
        {tagList.map(item => {
          const { key, title, url } = item;
          return (
            <Tag
              className="nav-tag"
              closable={true}
              key={key}
              title={title}
              color={key === currentTag?.key ? '#2db7f5' : undefined}
              onClose={() => closeTag(item)}
              onClick={() => handleClickTag(key)}
              children={<Link to={url}>{title}</Link>}
            />
          );
        })}
      </div>
      <Dropdown
        overlay={
          <Menu onClick={handleTriggerTagAction}>
            <Menu.Item key="0">关闭当前</Menu.Item>
            <Menu.Item key="1">关闭左边</Menu.Item>
            <Menu.Item key="2">关闭右边</Menu.Item>
            <Menu.Item key="3">关闭全部</Menu.Item>
          </Menu>
        }
      >
        <span>
          {' '}
          标签选项 <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
}
