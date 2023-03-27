<template>
    <a-layout style="min-height: 100vh !important;">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
          <user-outlined />
          <span class="nav-text">nav 4</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0',height:'100%' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px',height:'100%' }">content
        <div>
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content" v-if="current===0">
      <h3>场景选择</h3>
      {{ steps[current].content }}


      <a-form
    :model="formState"
    name="validate_other"
    v-bind="formItemLayout"
    @finishFailed="onFinishFailed"
    @finish="onFinish"
  >

    <a-form-item
      name="select"
      label="Select"
      has-feedback
      :rules="[{ required: true, message: 'Please select a scenario!' }]"
    >
      <a-select v-model:value="formState.select" placeholder="Please select a scenario">
        <a-select-option value="jianshen">健身</a-select-option>
        <a-select-option value="kongtiao">空调</a-select-option>
      </a-select>
    </a-form-item>


    <a-form-item label="Dragger">
      <a-form-item name="dragger" no-style>
        <a-upload-dragger v-model:fileList="formState.dragger" name="files" action="/upload.do">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">Support for a single or bulk upload.</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>



    </div>
    <div class="steps-content" v-if="current===1">
      <h3>模型构建</h3>
      {{ steps[current].content }}
      <div v-if="formState.select==='jianshen'">
        <h3>健身</h3>
      <a-list>
        <a-list-item>
            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </a-list-item>
    </a-list>

        

      </div>
      <div v-if="formState.select==='kongtiao'">
        <h3>空调</h3>
        <a-list>
        <a-list-item v-for="(image_path, index) in image_paths" :key="index">    
            <img alt="example" :src="image_path.path" />
            image_path.path
        </a-list-item>
      </a-list>
      </div>

    </div>
    <div class="steps-content" v-if="current===2">
      <h3>智能决策</h3>
      {{ steps[current].content }}
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div>
  </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>


</template>
<script>
import { defineComponent, ref,reactive  } from 'vue';
import { message,} from 'ant-design-vue';
export default defineComponent({
  setup() {
    const current = ref(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const formState = reactive({
      'input-number': 3,
      'checkbox-group': ['A', 'B'],
      rate: 3.5,
      select: '',
    });
    const onFinish = values => {
      console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    // 一个图片地址字典
    const image_paths = [
      {
        title: '初始目标',
        path: '/img/建模图/输入/初始目标.png',
      },
       {
        title: '初始问题图',
        path: '/img/建模图/输入/初始问题图.png',
      }, {
        title: '环境模型图',
        path: '/img/建模图/输入/环境模型图.png',
      }, {
        title: '适应性需求模型',
        path: '/img/建模图/输出适应性需求模型.png',
      }
    ];
      return {
      message,
      current,
      steps: [{
        title: '场景选择',
        content: 'First-content',
      }, {
        title: '模型构建',
        content: 'Second-content',
      }, {
        title: '智能决策',
        content: 'Last-content',
      }],
      next,
      prev,
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout,
      image_paths,
    };
  },
});
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /*text-align: center;*/
  /*padding-top: 80px;*/
}

.steps-action {
  margin-top: 24px;
}
#root,html,body{
  height: 100%;
}


[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
