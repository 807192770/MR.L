<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current': item.current}"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <!--表单 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
              >{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{ model === 'login' ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import sha1 from "js-sha1";
import { Message } from "element-ui";
import { GetSms, Register, Login } from "@/api/login";
import {
  stripscript,
  validatePass,
  validateEmail,
  validateVCode
} from "@/utils/validate";
export default {
  name: "login",
  data() {
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback(); //true
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      // 如果模块值为login, 直接通过
      if (this.model === "login") {
        callback();
      }
      // 过滤后的数据
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      // 这里面放置data数据、生命周期、自定义的函数
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      // 模块值
      model: "login",
      // 登录按钮禁用状态
      loginButtonStatus: false,
      // 验证码按钮状态
      codeButtonStatus: {
        status: false,
        text: "获取验证码"
      },
      // 倒计时
      timer: null,
      // 表单绑定数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      // 表单的验证
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    /**
     * 切换模块
     */
    toggleMenu(data) {
      this.menuTab.forEach((elem, index) => {
        elem.current = false;
      });
      // 高光
      data.current = true;
      // 修改模块值
      this.model = data.type;
      this.resetFromData();
      this.clearCountDown();
    },
    /**
     * 清除表单数据
     */
    resetFromData() {
      this.$refs.loginForm.resetFields(); // 3.0
    },
    /**
     * 更新按钮状态
     */
    updataButtonStatus(params) {
      this.codeButtonStatus.status = params.status;
      this.codeButtonStatus.text = params.text;
    },
    /**
     * 获取验证码
     */
    getSms() {
      // 进行提示
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空！！");
        return false;
      }
      if (validateEmail(this.ruleForm.username)) {
        this.$message.error("邮箱格式有误，请重新输入！！");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: this.ruleForm.username,
        module: this.model
      };
      // 修改获取验证按钮状态
      this.updataButtonStatus({
        status: true,
        text: "发送中"
      });
      // 延时多长时间
      GetSms(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success",
            dangerouslyUseHTMLString: true
          });
          // 启用登录或注册按钮
          this.loginButtonStatus = false;
          // 调定时器，倒计时
          this.countDown(60);
        })
        .catch(error => {
          // 启用登录或注册按钮
          this.loginButtonStatus = false;
          this.updataButtonStatus({
            status: false,
            text: "再次获取"
          });
          console.log(error);
        });
    },
    /**
     * 提交表单
     */
    submitForm(formName) {
      this.$router.push({
        name: "RealTimeMonitoringIndex"
      });
      return;
      this.$refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          // 三元运算
          this.model === "login" ? this.login() : this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 登录
     */
    login() {
      let repuestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };
      this.$store
        .dispatch("app/login", repuestData)
        .then(response => {
          // 页面跳转
          this.$router.push({
            name: "Console"
          });
        })
        .catch(error => {});
    },
    /**
     * 注册
     */
    register() {
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        module: "register"
      };
      // 注册接口
      Register(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          // 模拟注册成功
          this.toggleMenu(menuTab[0]);
          this.clearCountDown();
        })
        .catch(error => {
          // 失败时执行的代码
        });
    },
    /**
     * 倒计时
     */
    countDown(number) {
      // setTimeout:clearTimeout(变量)  只执行一次
      // setInterval:clearInterval(变量))  不断的执行，需要条件才会停止
      // 判断定时器是否存在，存在则清除
      if (this.timer) {
        clearInterval(this.timer);
      }
      let time = number;
      this.timer = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(this.timer);
          this.updataButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          this.codeButtonStatus.text = `倒计时${time}秒`; // es5 '倒计时' + time + '秒'
        }
      }, 1000);
    },
    /**
     * 清除倒计时
     */
    clearCountDown() {
      // 还原验证码按钮默认状态
      this.updataButtonStatus({
        status: false,
        text: "获取验证码"
      });
      // 清除倒计时
      clearInterval(this.timer);
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>