import React from 'react';
import style from './style.styl';
import _ from 'lodash';

export default React.createClass({
    getInitialState: function() {
        return {
            animate:true
        };
    },
    getDefaultProps: function() {
        return {
            data:{}
        }
    },
    render(){
        // debugger
        console.log(this.props.data)
        let sumRecords = _.sum(_.map(this.props.data.rates_distribution, item => item.count));
        return (
            <div className={style.wrapper}>
                {_.range(1,11).map((item, idx) => (
                    <ChartItem
                        className={style.chart}
                        value={this.props.data.rates_distribution[item] && this.props.data.rates_distribution[item].count}
                        percent={this.props.data.rates_distribution[item] && this.props.data.rates_distribution[item].percent}
                        key={item} animate={this.state.animate}
                        sumRecords={sumRecords}
                        order={item}
                    />
                    ))
                }

            </div>

        )
    }
});

let ChartItem = React.createClass({
    getDefaultProps: function() {
        return {
            value: '0',
            percent: '0',
            sumRecords: '100',
            animate: 'true'
        };
    },
    render: function(){
        let percentText = ((this.props.value / this.props.sumRecords) * 100).toFixed();
        let barHeight = this.props.animate ? {height:this.props.percent+'%'} : {height:0};
        return(
            <div className={style.container}>
                <div className={style.order}>{this.props.order}</div>
                <div className={style.bar}>
                    <div className={style.progress} style={barHeight}></div>
                </div>
                <div className={style.count}>{this.props.value || '•'}</div>
                <div className={style.percent}>{percentText || '•'}%</div>
            </div>
        )
    }
});