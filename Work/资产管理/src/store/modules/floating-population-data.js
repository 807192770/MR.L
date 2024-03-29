/* eslint-disable no-param-reassign */
// import axios from 'axios'
// import * as types from '../mutationTypes';

// initial state
const state = {
  floatingPopulationData: {
    visitedDays: {
      name: ['1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天', '11-15天', '16-20天', '21-25天','26-30天'],
      value: ['754.9', '380.9', '206.8', '128.3', '84.2', '60.6', '48.1', '41.2', '35.8', '33.5', '148.1', '144.2', '43.8','8.0'],
    },
    areaAllData: {
      citys: [{
        'name': '青海',
        'value': [101.4038, 36.8207],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      },{
        'name': '新疆',
        'value': [87.9236, 43.5883],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      },{
        'name': '西藏',
        'value': [91.11, 29.97],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      },{
        'name': '福建',
        'value': [119.4543, 25.9222],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      },{
        'name': '广东',
        'value': [113.12244, 23.009505],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      },{
        'name': '广西',
        'value': [108.479, 23.1152],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      },{
        'name': '湖北',
        'value': [114.3896, 30.6628],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '上海',
        'value': [121.4648, 31.2891],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '海南',
        'value': [110.3893, 19.8516],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },

      }, {
        'name': '河北',
        'value': [114.4995, 38.1006],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '河南',
        'value': [113.4668, 34.6234],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '山东',
        'value': [117.1582, 36.8701],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '山西',
        'value': [112.3352, 37.9413],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '陕西',
        'value': [109.1162, 34.2004],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '天津',
        'value': [117.4219, 39.4189],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '重庆',
        'value': [108.384366, 30.439702],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '辽宁',
        'value': [123.1238, 42.1216],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '黑龙江',
        'value': [127.9688, 45.368],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '安徽',
        'value': [117.29, 32.0581],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }, {
        'name': '浙江',
        'value': [119.5313, 29.8773],
        'symbolSize': '13',
        itemStyle: {
          normal: {
            color: '#05deff'
          }
        },
      }],
      moveLines: [{
        'fromName': '湖北',
        'toName': '长沙县',
        'coords': [
          [114.3896, 30.6628],
          [113.072171, 28.257535]
        ],
        'value': 992,
      }, {
        'fromName': '上海',
        'toName': '长沙县',
        'coords': [
          [121.4648, 31.2891],
          [113.072171, 28.257535]
        ],
        'value': 910
      }, {
        'fromName': '海南',
        'toName': '长沙县',
        'coords': [
          [110.3893, 19.8516],
          [113.072171, 28.257535]
        ],
        'value': 729
      }, {
        'fromName': '河北',
        'toName': '长沙县',
        'coords': [
          [114.4995, 38.1006],
          [113.072171, 28.257535]
        ],
        'value': 701
      }, {
        'fromName': '河南',
        'toName': '长沙县',
        'coords': [
          [113.4668, 34.6234],
          [113.072171, 28.257535]
        ],
        'value': 620
      }, {
        'fromName': '山东',
        'toName': '长沙县',
        'coords': [
          [117.1582, 36.8701],
          [113.072171, 28.257535]
        ],
        'value': 591
      }, {
        'fromName': '山西',
        'toName': '长沙县',
        'coords': [
          [112.3352, 37.9413],
          [113.072171, 28.257535]
        ],
        'value': 571
      }, {
        'fromName': '陕西',
        'toName': '长沙县',
        'coords': [
          [109.1162, 34.2004],
          [113.072171, 28.257535]
        ],
        'value': 515
      }, {
        'fromName': '天津',
        'toName': '长沙县',
        'coords': [
          [117.4219, 39.4189],
          [113.072171, 28.257535]
        ],
        'value': 482
      }, {
        'fromName': '重庆',
        'toName': '长沙县',
        'coords': [
          [108.384366, 30.439702],
          [113.072171, 28.257535]
        ],
        'value': 457
      }, {
        'fromName': '辽宁',
        'toName': '长沙县',
        'coords': [
          [123.1238, 42.1216],
          [113.072171, 28.257535]
        ],
        'value': 426
      }, {
        'fromName': '黑龙江',
        'toName': '长沙县',
        'coords': [
          [127.9688, 45.368],
          [113.072171, 28.257535]
        ],
        'value': 410
      }, {
        'fromName': '安徽',
        'toName': '长沙县',
        'coords': [
          [117.29, 32.0581],
          [113.072171, 28.257535]
        ],
        'value': 386
      }, {
        'fromName': '浙江',
        'toName': '长沙县',
        'coords': [
          [119.5313, 29.8773],
          [113.072171, 28.257535]
        ],
        'value': 348
      }, {
        'fromName': '广西',
        'toName': '长沙县',
        'coords': [
          [108.479, 23.1152],
          [113.072171, 28.257535]
        ],
        'value': 819
      }, {
        'fromName': '广东',
        'toName': '长沙县',
        'coords': [
          [113.12244, 23.009505],
          [113.072171, 28.257535]
        ],
        'value': 861
      }, {
        'fromName': '福建',
        'toName': '长沙县',
        'coords': [
          [119.4543, 25.9222],
          [113.072171, 28.257535]
        ],
        'value': 600
      }, {
        'fromName': '青海',
        'toName': '长沙县',
        'coords': [
          [101.4038, 36.8207],
          [113.072171, 28.257535]
        ],
        'value': 102
      }, {
        'fromName': '新疆',
        'toName': '长沙县',
        'coords': [
          [87.9236, 43.5883],
          [113.072171, 28.257535]
        ],
        'value': 97
      }, {
        'fromName': '西藏',
        'toName': '长沙县',
        'coords': [
          [91.11, 29.97],
          [113.072171, 28.257535]
        ],
        'value': 12
      }]
    }
  }
}
// actions
const actions = {}

// mutations
const mutations = {

}

const floatingPopulation = {
  namespaced: true,
  state: state,
  actions,
  mutations
}
export default floatingPopulation
