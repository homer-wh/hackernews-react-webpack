/**
 * 引入jquery，简化ajax处理
 */
import $ from 'jquery';

/**
 * 引入react
 */
import React from 'react';

/**
 * 引入react DOM 渲染
 */
import { render } from 'react-dom';

/**
 * 引入消息列表
 */
import NewsList from './NewsList.js';

/**
 * 引入样式表
 */
import './app.css';

/**
 * 定义ajax获取数据的get函数
 * @param  {[字符串]} url [数据获取地址]
 * @return {[对象]}     [调用promise的resolve方法，异步处理返回值]
 */
function get(url) {
	return Promise.resolve($.ajax(url));
}

/**
 * [调用get函数，处理数据并渲染到index.html]
 * @param  {Object} items)                                    {	render(<NewsList   items   [description]
 * @param  {[type]} $('#content')[0]);}).catch(function(err) {	console.log('error occur', err);}       [description]
 * @return {[type]}                                           [description]
 */
get('https://hacker-news.firebaseio.com/v0/topstories.json').then( function(stories) {
	return Promise.all(stories.slice(0, 30).map(itemId => get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json')));
}).then(function(items) {
	render(<NewsList items={items} />, $('#content')[0]);
}).catch(function(err) {
	console.log('error occur', err);
});

