import React, { useState, useRef, useEffect } from 'react';

export default function HooksDemo() {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  useEffect(() => {
    // 1.不加第二参数相当于 componentDidMount和componentDidUpdate
    // 2.加了空数组第二个参数只相当于componentDidMount
    // 3.加了第二个参数(数组count)相当于只监听count变化
    console.log(count);
    // 4.相当于componentWillUnmount
    return () => {};
  }, [count]);
  return (
    <div>
      <span ref={countRef}>{count}</span>
      <button onClick={() => setCount(count + 1)}>点我加1</button>
      <button onClick={() => alert(countRef.current.innerText)}>
        点我获取count
      </button>
    </div>
  );
}
