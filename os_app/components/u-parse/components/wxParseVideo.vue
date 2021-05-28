<template>
  <!--增加video标签支持，并循环添加-->
  <view :class="node.classStr" :style="node.styleStr">
    <video :class="node.classStr" class="video-video" :src="node.attr.src" @play='v_play' @pause='v_pause' @ended='v_ended'></video>
  </view>
</template>

<script>
export default {
  name: 'wxParseVideo',
  props: {
    node: {},
  },
  inject:['main'],
  mounted(){

  },
  methods:{
	  v_play(){
		  this.main.p_m(false)
	  },
	  v_pause(){
		  this.main.p_m(true)
	  },
	  v_ended(){
		   this.main.p_m(true)
	  },
  }
};
</script>
