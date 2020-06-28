/*! Qin Xiao */
(this.webpackJsonp=this.webpackJsonp||[]).push([[38],{"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_components_SearchTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/ui/components/SearchTable */ \"./src/ui/components/SearchTable/index.vue\");\n/* harmony import */ var _components_Icon_svg_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/Icon-svg/index */ \"./src/ui/components/Icon-svg/index.vue\");\n/* harmony import */ var _tableConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tableConfig.js */ \"./src/ui/views/qualityManage/safetyPerformance/tableConfig.js\");\n/* harmony import */ var _lib_axios_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lib/axios.js */ \"./lib/axios.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    Icon: _components_Icon_svg_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    SearchTable: _ui_components_SearchTable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  name: '',\n\n  data() {\n    return {\n      yearS: [],\n      deptData: [{\n        label: '厂务部',\n        value: 'dfd'\n      }, {\n        label: '我相信部',\n        value: 'ddfd'\n      }],\n      deptDataObj: {\n        ddfd: '我相信部',\n        'dfd': '厂务部'\n      },\n      tableData: [],\n      tableConfig: Object(_tableConfig_js__WEBPACK_IMPORTED_MODULE_2__[\"safetyYearConfig\"])(),\n      form: {},\n      num: 0,\n      sum: 0\n    };\n  },\n\n  created() {\n    this.form = {\n      deptId: 'dfd',\n      year: new Date().getFullYear() + ''\n    };\n    Object(_lib_axios_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n      url: `${this.$ip}/mms-qualification/securityMerits/getYearList`,\n      method: 'get'\n    }).then(d => {\n      this.yearS = d.data.map((k, l) => {\n        return {\n          label: k,\n          value: k\n        };\n      });\n    });\n    Object(_lib_axios_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n      url: `${this.$ip}/mms-qualification/businessDictionaryValue/listByCode/dept`,\n      method: 'get'\n    }).then(d => {\n      this.deptData = d.data.map((k, l) => {\n        return {\n          label: k,\n          value: k\n        };\n      });\n    });\n    this.getList();\n  },\n\n  watch: {},\n\n  mounted() {\n    let num = this.deptDataObj[this.form.deptId].length * 28 + 40;\n    this.$refs.dept.$el.style.width = `${num}px`;\n  },\n\n  methods: {\n    deptFouce(val) {\n      let num = 0;\n      console.log(val.length);\n\n      if (val.length) {\n        num = this.deptDataObj[this.form.deptId].length * 28 + 40;\n      }\n\n      console.log(num);\n      this.$refs.dept.$el.style.width = `${num}px`;\n      this.getList();\n    },\n\n    exportExcel() {\n      console.log(this.form);\n      this.$refs.a.click();\n    },\n\n    objectSpanMethod({\n      row,\n      column,\n      rowIndex,\n      columnIndex\n    }) {\n      if (columnIndex === 0) {\n        // console.log(rowIndex, columnIndex, row.col, row.oldCol);\n        if ((rowIndex - row.oldCol) % row.col === 0) {\n          return {\n            rowspan: row.col,\n            colspan: 1\n          };\n        } else {\n          return [0, 0];\n        }\n      }\n    },\n\n    getList() {\n      Object(_lib_axios_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n        url: `${this.$ip}/mms-qualification/securityMerits/getList`,\n        method: 'post',\n        data: {\n          deptName: this.form.deptId,\n          year: this.form.year\n        }\n      }).then(d => {\n        this.tableData = [];\n        let sss = { ...d\n        };\n        sss.data.map((k, l) => {\n          let data = {};\n          let num = 0;\n\n          for (let i = 0; i < l; i++) {\n            num = (sss.data[i].securityMeritsDetails.length || 1) + num;\n          }\n\n          if (k.securityMeritsDetails.length) {\n            k.securityMeritsDetails.map((q, w) => {\n              data = {\n                month: k.month,\n                ...q,\n                col: k.securityMeritsDetails.length,\n                oldCol: num\n              };\n              this.tableData.push(data);\n            });\n          } else {\n            this.tableData.push({\n              month: k.month,\n              col: 1,\n              oldCol: num\n            });\n          }\n        });\n        console.log(this.tableData);\n      });\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options")},"./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--3-0!./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js??ref--3-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--3-4!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(module,exports){eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?./node_modules/extract-text-webpack-plugin/dist/loader.js??ref--3-0!./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js??ref--3-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??postcss!./node_modules/sass-loader/dist/cjs.js??ref--3-4!./node_modules/vue-loader/lib??vue-loader-options")},"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=template&id=620aea2f&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=template&id=620aea2f&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c("div", [\n    _c("div", { staticClass: "sysParameter" }, [\n      _c("div", { staticClass: "top-content" }, [\n        _c("div", { staticClass: "top-content-title" }, [\n          _c(\n            "span",\n            { staticClass: "dept" },\n            [\n              _c(\n                "el-select",\n                {\n                  ref: "dept",\n                  attrs: { filterable: "" },\n                  on: { change: _vm.deptFouce },\n                  model: {\n                    value: _vm.form.deptId,\n                    callback: function($$v) {\n                      _vm.$set(_vm.form, "deptId", $$v)\n                    },\n                    expression: "form.deptId"\n                  }\n                },\n                _vm._l(_vm.deptData, function(item) {\n                  return _c("el-option", {\n                    key: item.value,\n                    attrs: { label: item.label, value: item.value }\n                  })\n                }),\n                1\n              )\n            ],\n            1\n          ),\n          _vm._v(" "),\n          _c(\n            "span",\n            [\n              _c(\n                "el-select",\n                {\n                  ref: "year",\n                  staticStyle: { width: "100px" },\n                  attrs: { filterable: "" },\n                  on: { change: _vm.getList },\n                  model: {\n                    value: _vm.form.year,\n                    callback: function($$v) {\n                      _vm.$set(_vm.form, "year", $$v)\n                    },\n                    expression: "form.year"\n                  }\n                },\n                _vm._l(_vm.yearS, function(item) {\n                  return _c("el-option", {\n                    key: item.value,\n                    attrs: { label: item.label, value: item.value }\n                  })\n                }),\n                1\n              ),\n              _vm._v("\\n                    年度-安全绩效\\n                ")\n            ],\n            1\n          )\n        ]),\n        _vm._v(" "),\n        _c("div", { staticClass: "top-toolbar" }, [\n          _c(\n            "div",\n            {\n              on: {\n                click: function($event) {\n                  return _vm.exportExcel()\n                }\n              }\n            },\n            [\n              _c("icon", { attrs: { iconClass: "export" } }),\n              _vm._v("导出\\n                    "),\n              _c("a", {\n                ref: "a",\n                attrs: {\n                  href:\n                    this.$ip +\n                    "/mms-qualification/download/yearSecurityMerits?year=" +\n                    _vm.form.year +\n                    "&deptId=" +\n                    _vm.form.deptId\n                }\n              })\n            ],\n            1\n          )\n        ])\n      ]),\n      _vm._v(" "),\n      _c(\n        "div",\n        { staticClass: "main-content" },\n        [\n          _c("SearchTable", {\n            ref: "searchTable",\n            attrs: {\n              noSearch: true,\n              spanMethod: _vm.objectSpanMethod,\n              data: _vm.tableData,\n              tableConfig: _vm.tableConfig,\n              refTag: "searchTable",\n              showHeader: false,\n              showPage: true\n            }\n          })\n        ],\n        1\n      )\n    ])\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options')},"./src/ui/views/qualityManage/safetyPerformance/tableConfig.js":
/*!*********************************************************************!*\
  !*** ./src/ui/views/qualityManage/safetyPerformance/tableConfig.js ***!
  \*********************************************************************/
<<<<<<< HEAD:build/38.cdd2f5896ff9b6981781.chunk.js
/*! exports provided: safetyConfig, safetyDetailsConfig, safetyYearConfig */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safetyConfig\", function() { return safetyConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safetyDetailsConfig\", function() { return safetyDetailsConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safetyYearConfig\", function() { return safetyYearConfig; });\nlet timeInfo = row => {\n  if (row.reviewerTime) {\n    return row.reviewerTime.split(' ')[0];\n  } else {\n    return '';\n  }\n};\n\nconst safetyConfig = obj => {\n  return [{\n    slot: 'radio',\n    label: '选择',\n    width: 49,\n    search: {\n      type: 'text',\n      label: '过滤'\n    }\n  }, {\n    prop: 'year',\n    label: '年份',\n    width: 60,\n    sortProp: \"year\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'year',\n      placeholder: \"请输入年份\",\n      clear: false\n    }\n  }, {\n    prop: 'month',\n    label: '月份',\n    width: 60,\n    sortProp: \"month\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'month',\n      placeholder: \"请输入月份\",\n      clear: false\n    }\n  }, {\n    prop: 'deptName',\n    label: '部门',\n    sortProp: \"deptName\",\n    align: 'center',\n    search: {\n      type: 'select',\n      prop: 'deptName',\n      placeholder: \"请选择\",\n      data: obj.dept\n    }\n  }, {\n    prop: 'reviewerName',\n    label: '批准人',\n    sortProp: \"reviewerName\",\n    align: 'center',\n    search: {\n      type: 'input',\n      prop: 'reviewerName',\n      placeholder: \"请输入批准人\"\n    }\n  }, {\n    prop: 'reviewerTime',\n    label: '审批日期',\n    formatter: timeInfo,\n    sortProp: \"reviewerTime\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'date',\n      prop: 'reviewerTime',\n      placeholder: \"请选择审批日期\"\n    }\n  }, {\n    slot: 'option',\n    width: 130,\n    label: '操作',\n    align: 'center',\n    search: {\n      type: 'btn',\n      label: '搜索',\n      icon: \"table_search\"\n    }\n  }];\n};\nconst safetyDetailsConfig = obj => {\n  return [{\n    slot: 'radio',\n    label: '选择',\n    width: 49,\n    search: {\n      type: 'text',\n      label: '过滤'\n    }\n  }, {\n    prop: 'number',\n    label: '编号',\n    sortProp: \"number\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'number',\n      placeholder: \"请输入编号\"\n    }\n  }, {\n    prop: 'quota',\n    label: '指标',\n    sortProp: \"quota\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'quota',\n      placeholder: \"请输入指标\"\n    }\n  }, {\n    prop: 'quotaType',\n    label: '指标类型',\n    sortProp: \"quotaType\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'select',\n      prop: 'quotaType',\n      placeholder: \"请输入指标类型\",\n      data: obj.indicateType\n    }\n  }, {\n    prop: 'sources',\n    label: '监控信息来源',\n    sortProp: \"sources\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'sources',\n      placeholder: \"请输入监控信息来源\"\n    }\n  }, // { prop: 'formulas', label: '计算公式', sortProp:\"formulas\", align: 'center' ,sort:true,search:{type:'input', prop:'formulas',placeholder:\"请输入计算公式\"}},\n  // { prop: 'targetValue', label: '目标值', sortProp:\"targetValue\", align: 'center' ,sort:true,search:{type:'input', prop:'targetValue',placeholder:\"请输入目标值\"}},\n  {\n    prop: 'warningWules',\n    label: '预警规则',\n    sortProp: \"warningWules\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'warningWules',\n      placeholder: \"请输入预警规则\"\n    }\n  }, {\n    prop: 'content',\n    label: '内容',\n    sortProp: \"content\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'content',\n      placeholder: \"请输入内容\"\n    }\n  }, {\n    prop: 'project',\n    label: '责任人/项目',\n    sortProp: \"project\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'project',\n      placeholder: \"请输入责任人/项目\"\n    }\n  }, {\n    prop: 'implementation',\n    label: '落实情况',\n    sortProp: \"implementation\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'implementation',\n      placeholder: \"请输入落实情况\"\n    }\n  }, {\n    prop: 'monitorState',\n    width: 130,\n    label: '状态监控（绩效）',\n    sortProp: \"monitor_state\",\n    search: {\n      type: 'input',\n      extendType: 'search',\n      prop: 'monitor_state',\n      placeholder: \"请输入状态监控（绩效）\"\n    }\n  }];\n};\nconst safetyYearConfig = () => {\n  return [{\n    prop: 'month',\n    label: '月',\n    width: 49,\n    align: 'center'\n  }, {\n    prop: 'number',\n    label: '编号',\n    align: 'center'\n  }, {\n    prop: 'quota',\n    label: '指标',\n    align: 'center'\n  }, {\n    prop: 'quotaType',\n    label: '指标类型',\n    align: 'center'\n  }, {\n    prop: 'sources',\n    label: '监控信息来源',\n    align: 'center'\n  }, {\n    prop: 'formulas',\n    label: '计算公式',\n    align: 'center'\n  }, {\n    prop: 'targetValue',\n    label: '目标值',\n    align: 'center'\n  }, {\n    prop: 'warningWules',\n    label: '预警规则',\n    align: 'center'\n  }, {\n    prop: 'content',\n    label: '内容',\n    align: 'center'\n  }, {\n    prop: 'project',\n    label: '责任人/项目',\n    align: 'center'\n  }, {\n    prop: 'implementation',\n    label: '落实情况',\n    align: 'center'\n  }, {\n    prop: 'monitorState',\n    label: '状态监控（绩效）'\n  }];\n};\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/tableConfig.js?")},"./src/ui/views/qualityManage/safetyPerformance/year/index.vue":
=======
/*! exports provided: safetyConfig, safetyDetailsConfig, safetyYearConfig */function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safetyConfig\", function() { return safetyConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safetyDetailsConfig\", function() { return safetyDetailsConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"safetyYearConfig\", function() { return safetyYearConfig; });\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ \"./node_modules/moment/moment.js\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);\n\n\nlet timeInfo = row => {\n  if (row.reviewerTime) {\n    return moment__WEBPACK_IMPORTED_MODULE_0___default()(row.reviewerTime).format('YYYY-MM-DD'); // return row.reviewerTime.split(' ')[0]\n  } else {\n    return '';\n  }\n};\n\nconst safetyConfig = obj => {\n  return [{\n    slot: 'radio',\n    label: '选择',\n    width: 49,\n    search: {\n      type: 'text',\n      label: '过滤'\n    }\n  }, {\n    prop: 'year',\n    label: '年份',\n    width: 60,\n    sortProp: \"year\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'year',\n      placeholder: \"请输入年份\",\n      clear: false\n    }\n  }, {\n    prop: 'month',\n    label: '月份',\n    width: 60,\n    sortProp: \"month\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'month',\n      placeholder: \"请输入月份\",\n      clear: false\n    }\n  }, {\n    prop: 'deptName',\n    label: '部门',\n    sortProp: \"deptName\",\n    align: 'center',\n    search: {\n      type: 'select',\n      prop: 'deptName',\n      placeholder: \"请选择\",\n      data: obj.dept\n    }\n  }, {\n    prop: 'reviewerName',\n    label: '批准人',\n    sortProp: \"reviewerName\",\n    align: 'center',\n    search: {\n      type: 'input',\n      prop: 'reviewerName',\n      placeholder: \"请输入批准人\"\n    }\n  }, {\n    prop: 'reviewerTime',\n    label: '审批日期',\n    formatter: timeInfo,\n    sortProp: \"reviewerTime\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'date',\n      prop: 'reviewerTime',\n      placeholder: \"请选择审批日期\"\n    }\n  }, {\n    slot: 'option',\n    width: 130,\n    label: '操作',\n    align: 'center',\n    search: {\n      type: 'btn',\n      label: '搜索',\n      icon: \"table_search\"\n    }\n  }];\n};\nconst safetyDetailsConfig = obj => {\n  return [{\n    slot: 'radio',\n    label: '选择',\n    width: 49,\n    search: {\n      type: 'text',\n      label: '过滤'\n    }\n  }, {\n    prop: 'number',\n    label: '编号',\n    sortProp: \"number\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'number',\n      placeholder: \"请输入编号\"\n    }\n  }, {\n    prop: 'quota',\n    label: '指标',\n    sortProp: \"quota\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'quota',\n      placeholder: \"请输入指标\"\n    }\n  }, {\n    prop: 'quotaType',\n    label: '指标类型',\n    sortProp: \"quotaType\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'select',\n      prop: 'quotaType',\n      placeholder: \"请输入指标类型\",\n      data: obj.indicateType\n    }\n  }, {\n    prop: 'sources',\n    label: '监控信息来源',\n    sortProp: \"sources\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'sources',\n      placeholder: \"请输入监控信息来源\"\n    }\n  }, // { prop: 'formulas', label: '计算公式', sortProp:\"formulas\", align: 'center' ,sort:true,search:{type:'input', prop:'formulas',placeholder:\"请输入计算公式\"}},\n  // { prop: 'targetValue', label: '目标值', sortProp:\"targetValue\", align: 'center' ,sort:true,search:{type:'input', prop:'targetValue',placeholder:\"请输入目标值\"}},\n  {\n    prop: 'warningWules',\n    label: '预警规则',\n    sortProp: \"warningWules\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'warningWules',\n      placeholder: \"请输入预警规则\"\n    }\n  }, {\n    prop: 'content',\n    label: '内容',\n    sortProp: \"content\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'content',\n      placeholder: \"请输入内容\"\n    }\n  }, {\n    prop: 'project',\n    label: '责任人/项目',\n    sortProp: \"project\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'project',\n      placeholder: \"请输入责任人/项目\"\n    }\n  }, {\n    prop: 'implementation',\n    label: '落实情况',\n    sortProp: \"implementation\",\n    align: 'center',\n    sort: true,\n    search: {\n      type: 'input',\n      prop: 'implementation',\n      placeholder: \"请输入落实情况\"\n    }\n  }, {\n    prop: 'monitorState',\n    width: 130,\n    label: '状态监控（绩效）',\n    sortProp: \"monitor_state\",\n    search: {\n      type: 'input',\n      extendType: 'search',\n      prop: 'monitor_state',\n      placeholder: \"请输入状态监控（绩效）\"\n    }\n  }];\n};\nconst safetyYearConfig = () => {\n  return [{\n    prop: 'month',\n    label: '月',\n    width: 49,\n    align: 'center'\n  }, {\n    prop: 'number',\n    label: '编号',\n    align: 'center'\n  }, {\n    prop: 'quota',\n    label: '指标',\n    align: 'center'\n  }, {\n    prop: 'quotaType',\n    label: '指标类型',\n    align: 'center'\n  }, {\n    prop: 'sources',\n    label: '监控信息来源',\n    align: 'center'\n  }, {\n    prop: 'formulas',\n    label: '计算公式',\n    align: 'center'\n  }, {\n    prop: 'targetValue',\n    label: '目标值',\n    align: 'center'\n  }, {\n    prop: 'warningWules',\n    label: '预警规则',\n    align: 'center'\n  }, {\n    prop: 'content',\n    label: '内容',\n    align: 'center'\n  }, {\n    prop: 'project',\n    label: '责任人/项目',\n    align: 'center'\n  }, {\n    prop: 'implementation',\n    label: '落实情况',\n    align: 'center'\n  }, {\n    prop: 'monitorState',\n    label: '状态监控（绩效）'\n  }];\n};\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/tableConfig.js?")},"./src/ui/views/qualityManage/safetyPerformance/year/index.vue":
>>>>>>> 2870cae8be8bbcb2e18e805912e8e858a40927ac:build/38.06de4fbe37b968bac856.chunk.js
/*!*********************************************************************!*\
  !*** ./src/ui/views/qualityManage/safetyPerformance/year/index.vue ***!
  \*********************************************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_vue_vue_type_template_id_620aea2f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=620aea2f&scoped=true& */ "./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=template&id=620aea2f&scoped=true&");\n/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss& */ "./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss&");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(\n  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],\n  _index_vue_vue_type_template_id_620aea2f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],\n  _index_vue_vue_type_template_id_620aea2f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],\n  false,\n  null,\n  "620aea2f",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = "src/ui/views/qualityManage/safetyPerformance/year/index.vue"\n/* harmony default export */ __webpack_exports__["default"] = (component.exports);\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?')},"./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=script&lang=js&");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); \n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?')},"./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss&":
/*!*******************************************************************************************************************************!*\
  !*** ./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_ref_3_4_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/extract-text-webpack-plugin/dist/loader.js??ref--3-0!../../../../../../node_modules/vue-style-loader!../../../../../../node_modules/css-loader/dist/cjs.js??ref--3-2!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/src??postcss!../../../../../../node_modules/sass-loader/dist/cjs.js??ref--3-4!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss& */ "./node_modules/extract-text-webpack-plugin/dist/loader.js?!./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=style&index=0&id=620aea2f&scoped=true&lang=scss&");\n/* harmony import */ var _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_ref_3_4_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_ref_3_4_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_ref_3_4_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \'default\') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_ref_3_4_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__["default"] = (_node_modules_extract_text_webpack_plugin_dist_loader_js_ref_3_0_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_postcss_node_modules_sass_loader_dist_cjs_js_ref_3_4_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_620aea2f_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?')},"./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=template&id=620aea2f&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=template&id=620aea2f&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_620aea2f_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=620aea2f&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/ui/views/qualityManage/safetyPerformance/year/index.vue?vue&type=template&id=620aea2f&scoped=true&");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_620aea2f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_620aea2f_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });\n\n\n\n//# sourceURL=webpack:///./src/ui/views/qualityManage/safetyPerformance/year/index.vue?')}}]);