<!--
    @info 里程碑节点信息弹窗
-->
<template>
  <div id="layer_milepost_nodeInfo">
    <el-dialog
      :visible.sync="isShow"
      :show-close="false"
      class="nodeDialog"
      center
      width="400px"
      :append-to-body="true"
    >
      <template slot="title">
        <div></div>
        <div class="el-dialog_header_step">航班({{ nodeInfo.flightNo }}){{ nodeInfo.processName }}</div>
        <i class="el-icon-circle-close" @click="isShow = false"></i>
      </template>
      <ul class="m-nodeInfo">
        <li v-for="(item, idx) in deviationReportList" :key="idx">
          <div class="user f-flex mid">
            <span class="name">{{ item.operatorName }}</span>
            <time>{{ item.reportTime }}</time>
          </div>
          <div class="content">{{ item.reportContent }}</div>
          <div v-if="item.remark" class="remark f-flex mid">
            <div>备注：</div>
            <div>{{ item.remark }}</div>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      nodeInfo: {

      },
      deviationReportList: []
    }
  },
  watch: {

  },
  created () {

  },
  watch: {

  },
  methods: {
    show (off) {
      this.isShow = !!off;
    },
    init (nodeInfo) {
      let deviationReportList = nodeInfo.deviationReportList || [];

      delete nodeInfo.deviationReportList;

      this.nodeInfo = nodeInfo;
      this.deviationReportList = deviationReportList;
    },
  }
}
</script>

<style lang="scss" scoped>
.el-icon-circle-close {
  color: #fff;
  cursor: pointer;
  font-size: 24px;
}
.f-flex {
  display: flex;
}
.f-flex.mid {
  align-items: center;
}

.m-nodeInfo {
  > li {
    border: 1px dashed #3d568e;
    margin-bottom: 15px;
    padding: 0.2rem;
    > .user {
      > .name {
        color: #3d568e;
        font-size: 24px;
        margin-right: 10px;
      }
      > time {
        color: #6c6c6c;
      }
    }
    > .content {
      margin: 10px 0;
      font-size: 18px;
    }
    > .remark {
    }
  }
}
</style>
