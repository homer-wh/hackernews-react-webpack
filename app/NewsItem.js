
/**
 * 引入react
 */
import React from 'react';

/**
 * 引入样式表
 */
import './NewsItem.css';

/**
 * 引入url-loader
 */
import URL from 'url';  

/**
 * 引入图片
 */
import ImageGrayArrow from './grayarrow.gif';

/**
 * 引入时间间距计算方法
 */
import Moment from 'moment';


export default class NewsItem extends React.Component {
	/*获取每一条item的地址*/
	getDomain() {
		return URL.parse(this.props.item.url).hostname;
	}
	/*获取每一条item的标题*/
	getTitle() {
		return (
			<div className="newsItem-title">
				<a className="newsItem-titleLink" href={this.props.item.url ? this.props.item.url : 'https://news.ycombinator.com/item?id=' + this.props.item.id }> {this.props.item.title} </a>
				{
					this.props.item.url && <span className="newsItem-domain"><a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>({this.getDomain()})</a></span>
				}
			</div>
		);
	}
	
	getCommentLink() {  
		var commentText = 'discuss';
		if(this.props.item.kids && this.props.item.kids.length) {
			commentText = this.props.item.kids.length + 'comment';
		}

		return (
			<a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
		);
	}
	
	getSubtext() {
		return (
			<div className="newsItem-subtext">
				{this.props.item.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {Moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
			</div>
		);
	}

	getRank() {
		return (
			<div className="newsItem-rank">
				{this.props.rank}.
			</div>
		);
	}

	getVote() {
		return (
			<div className="newsItem-vote">
				<a href={'https://news.ycombinator.com/vote?for=' + this.props.item.id + '&dir=up&goto=news'}>
					<img src={ImageGrayArrow} width="10" />
				</a>
			</div>
		);
	}

	render() {
		return (
			<div className="newsItem">
				{this.getRank()}
				{this.getVote()}
				<div className="newsItem-itemText">
					{this.getTitle()}
					{this.getSubtext()}
				</div>
			</div>
		);
	}
}