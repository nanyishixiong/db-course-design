/**
 * 利用 React.lazy + Susponse 实现一个异步组件
 *
 * React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
 */

import React, { Component } from 'react'
import Loading from '@/component/Loading';

/**
 *
 * @param {*} Component  需要异步数据的component
 * @param {*} api        请求数据接口,返回Promise，可以再then中获取与后端交互的数据
 * @returns
 */
export default function AysncComponent(Component, api) {
  const AysncComponentPromise = () => new Promise(async (resolve) => {
    const data = await api()
    resolve({
      default: (props) => <Component rdata={data} {...props} />
    })
  })
  return React.lazy(AysncComponentPromise)
}


export function AsyncComponent1(importComponent) {
  class AsyncComponent extends Component {

    state = { component: null }

    async componentDidMount() {
      const { default: component } = await importComponent();

      setTimeout(() => {
        this.setState({ component: component })
      }, 2000)
    }

    render() {
      const C = this.state.component;

      return C
        ? <C {...this.props} />
        : <Loading />
    }
  }
  return AsyncComponent;
}