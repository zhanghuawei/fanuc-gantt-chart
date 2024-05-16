<template>
  <div class="ganttChartGrid">
    <div class="grid-header">
      <div class="header-btn">
        <div v-for="(item, index) in dateTabList" :class="['btn-item', { 'btn-item-active': dateTabIndex == index }]"
          @click="selectDateTab(index)">
          {{ item.label }}
        </div>
      </div>

    </div>
    <div id="grid-text" class="grid-body"></div>
    <div id="grid-body" class="grid-body">
      <!-- <svg width="100%" height="400" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fafafa">
        <g class="grid-rows">
          <rect v-for="(item, index) in rows" x="0" :y="index * height" width="2500" :height="height"
            :class="index % 2 == 0 ? 'item-bg' : 'item-bg-e'"></rect>
        </g>
        <g>
          <line v-for="(item, index) in rows" x="0" :y1="index * height" x2="2500" :y2="index * height"
            class="grid-line"></line>
        </g>
      </svg> -->
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'ganttChartGrid',
  inject: ['defaultDate', 'dateList', 'dataList'],
  data() {
    return {
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      height: 40,
      dateTabIndex: 1,
      dateTabList: [
        // 'hour', 'day', 'week', 'month', 'season', 'year'
        { label: '小时', key: 'hour' },
        { label: '日', key: 'day' },
        { label: '周', key: 'week' },
        { label: '月', key: 'month' },
        { label: '季', key: 'season' },
        { label: '年', key: 'year' },
      ],
      tasks: [
        { id: 1, name: '任务 1', start: 10, end: 200 },
        { id: 2, name: '任务 2', start: 30, end: 400 },
      ]
    }
  },
  mounted() {
    const i = this.dateTabList.findIndex(v => v.key == this.defaultDate);
    if (i != -1) this.dateTabIndex = i;
    this.init();
  },
  methods: {
    init() {
      const width = '100%';
      const height = '100%';
      const marginTop = 20;
      const marginRight = 20;
      const marginBottom = 30;
      const marginLeft = 40;
      // const x = d3.scaleUtc()
      //   .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      //   .range([marginLeft, width - marginRight]);

      // Declare the y (vertical position) scale.
      // const y = d3.scaleLinear()
      //   .domain([0, 100])
      //   .range([height - marginBottom, marginTop]);

      // Create the SVG container.
      const rectw = 100;
      const recth = 40;
      const overallWidth = 2500;
      const rowLength = 11;
      const lineColor = '#ebeff2';
      const svg = d3.create("svg").attr("width", overallWidth).attr("height", height);
      const row = svg.append("g").attr('id', 'grid-rows').attr('class', 'grid-rows');
      const rowRect = svg.append("g").attr('id', 'grid-rects').attr('class', 'grid-rects');
      const column = svg.append("g").attr('class', 'grid-columns');

      const xScale = d3.scaleLinear().domain([0, overallWidth]).range([0, overallWidth]);
      const text = svg.append("g").attr('class', 'task-bar');
      // 绘制任务条
      // const taskBars = svg.selectAll('.task-bar')
      // .data(this.tasks)
      // .enter()
      // .append('rect')
      // .attr('class', 'task-bar')
      // .attr('x', d => xScale(d.start))
      // .attr('y', 50)
      // .attr('width', d => xScale(d.end - d.start))
      // .attr('height', 20)
      // .attr('fill', '#6698ff');

      
      // 定义拖动行为
      // this.tasks.forEach(item => {
      //   const text = svg.append("g").attr('class', 'g');
      //   text.append('rect')
      //     .attr('x', item.start)
      //     .attr('y', 100)
      //     .attr('width', item.end - item.start)
      //     .attr('height', recth)
      //     .attr('fill', '#6698ff');

      //   text.append('text')
      //     .attr('x', item.start + 5)
      //     .attr('y', 100 + recth / 2)
      //     .text(item.name);
      // });
      svg.selectAll('.text').data(this.tasks).enter().append('text').text(d => d.name).attr('x', d => d.start).attr('y', d => d.start + 10)
      svg.selectAll('.task-bar')
      .data(this.tasks)
      .enter()
      .append('rect')
      .attr('class', 'task-bar')
      .attr('x', d => xScale(d.start))
      .attr('y', 50)
      .attr('width', d => xScale(d.end - d.start))
      .attr('height', 20)
      .attr('fill', '#6698ff');

      const data = [1, 2, 3];

      const selection = d3.select('body')
        .selectAll('.div')
        .data(data);

      const enterSelection = selection.enter();

      enterSelection.append('div')
        .attr('style', function (d) {
          return {
            'left': d * 50 + 'px',
            'right': d * 50 + 'px',
          }
        })
        .attr('y', function (d) { return d * 50; })
        .text(d => d);

      const taskBars = svg.selectAll('.task-bar')
      // 添加拖动功能
      const dragHandler = d3.drag()
        .on('start', function (event) {
          // 记录开始拖动时的鼠标位置
          console.log('d3.event------', d3);
          this.startX = event.subject.x;
          this.startY = event.subject.y;
        })
        .on('drag', function (event) {
          // 根据鼠标移动的方向计算 g 标签的新位置
          const currentX = event.subject.x;
          const currentY = event.subject.y;

          if (currentX < this.startX) {
            // 向左拖动
            svg.selectAll('.g')
              .attr('x', currentX + this.startX);
          } else if (currentX > this.startX) {
            // 向右拖动
            svg.selectAll('.g')
              .attr('x', currentX - this.startX);
          }

          if (currentY < this.startY) {
            // 向上拖动
            svg.selectAll('.g')
              .attr('y', currentY + this.startY);
          } else if (currentY > this.startY) {
            // 向下拖动
            svg.selectAll('.g')
              .attr('y', currentY - this.startY);
          }
        })
        .on('end', function (event) {
          const currentX = event.subject.x;
          const currentY = event.subject.y;
          // 恢复 g 标签的原始位置
          svg.selectAll('.g')
            .attr('x', currentX + this.startX);
          svg.selectAll('.g')
            .attr('y', currentY + this.startY);
        });

      // 将拖动处理器应用到 g 标签上
      svg.call(dragHandler);


      const columnLength = 13;

      // for (let index = 0; index < columnLength; index++) {
      //   const line = column.append('line')
      //   .attr("x1", index * w)
      //   .attr("y1", 0)
      //   .attr("x2", index * w)
      //   .attr("y2", overallWidth)
      //   .attr("zinde", overallWidth)
      //   .style("stroke", lineColor)
      //   .style('stroke-width', 1)
      // }

      // Add the x-axis.
      //   svg.append("g")
      //     .attr("transform", `translate(0,${height - marginBottom})`)
      //     .call(d3.axisBottom(x));

      //   // Add the y-axis.
      //   svg.append("g")
      //     .attr("transform", `translate(${marginLeft},0)`)
      //     .call(d3.axisLeft(y));  
      //   svg.append("line")
      // .attr("x1", 50)
      // .attr("y1", 50)
      // .attr("x2", 200)
      // .attr("y2", 200)
      // .attr("stroke", "red");

      // Append the SVG element.
      const container = document.getElementById('grid-body');
      container.append(svg.node());
      this.creatRows(recth, overallWidth);
    },
    creatRows(recth, overallWidth) {
      const rowp = d3.select('#grid-rows');
      const rectp = d3.select('#grid-rects');
      for (let index = 0; index < this.dataList.length; index++) {
        rowp.append('line')
          .attr("x1", 0)
          .attr("y1", index * recth)
          .attr("x2", overallWidth)
          .attr("y2", index * recth)
          .style("stroke", 'red')
          .style('stroke-width', 1)

        rectp.append('rect')
          .attr("x", 0)
          .attr("y", index * recth)
          .attr("width", overallWidth)
          .attr("height", recth)
          .style('fill', index % 2 == 0 ? '#fafafa' : '#fff')
          .attr('class', index % 2 == 0 ? 'item-bg' : 'item-bg-e')
      }
    },
    creatColumns() {

    },
    creatRects() {

    },
    selectDateTab(index) {
      this.dateTabIndex = index;
    }
  },
}
</script>

<style lang="scss">
.ganttChartGrid {
  overflow: hidden;
  width: 100%;
  height: 400px;
  color: rgba(0, 0, 0, .65);
  padding: 16px;

  .grid-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;

    // border: 1px solid #ddd;
    .header-btn {
      display: flex;
      overflow: hidden;
      // border: 1px solid #ddd;
      // border-radius: 4px;
    }

    .btn-item {
      padding: 0.125rem 15px;
      border: 1px solid #ddd;
      border-right-color: transparent;
      cursor: pointer;
    }

    .btn-item:first-child {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .btn-item:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid #ddd;
    }

    .btn-item-active {
      color: #fff;
      border-color: #6698ff;
      background-color: #6698ff;
    }
  }

  .grid-body {
    position: relative;
    overflow: scroll;
    padding: 16px 20px;
    background-color: #fafafa;
  }

  .grid-rows {
    z-index: 1;
  }

  .grid-rects {
    z-index: 1;
  }

  .grid-columns {
    z-index: 2;
  }

  .grid-item {
    background: 1px solid #eee;
  }

  .item-bg {
    // color: #fff;
    fill: #fff;
    background-color: red;
  }

  .item-bg-e {
    // color: #eee;
    fill: #f5f5f5;
    background-color: #eee;
  }

  .grid-line {
    stroke: #ebeff2;
  }
}
</style>