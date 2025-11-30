<template>
  <v-app-bar app dark>

    <!-- 모바일: xs 전용(햄버거 + 로고) -->
    <v-container class="d-sm-none">
    <v-row align="center" justify="center" no-gutters>
        <v-col cols="4"></v-col>
        <v-col cols="4" class="text-center">
        <v-btn text :to="{ path: '/' }">Chatting</v-btn>
        </v-col>

        <v-col cols="4" class="text-right">
        <v-btn icon @click="drawer = true">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
        </v-col>
    </v-row>
    </v-container>


    <!-- 데스크탑: sm 이상 전용 -->
    <v-container class="d-none d-sm-block">
      <v-row align="center">

        <v-col class="d-flex justify-start">
          <v-btn :to="{ path: '/member/list' }" class="mr-2">회원 목록</v-btn>
          <v-btn :to="{ path: '/chat/group/list' }">채팅방 목록</v-btn>
        </v-col>

        <v-col class="text-center">
          <v-btn :to="{ path: '/' }">Chatting</v-btn>
        </v-col>

        <v-col class="d-flex justify-end">
          <v-btn v-if="isLogin" :to="{ path: '/my/chat/page' }">My Chat</v-btn>
          <v-btn v-if="!isLogin" :to="{ path: '/member/create' }">회원가입</v-btn>
          <v-btn v-if="!isLogin" :to="{ path: '/login' }" class="ml-2">로그인</v-btn>
          <v-btn v-if="isLogin" @click="doLogout" class="ml-2">로그아웃</v-btn>
        </v-col>

      </v-row>
    </v-container>

  </v-app-bar>

  <!-- 사이드바(모바일 메뉴) -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    right
  >
    <v-list>

      <v-list-item :to="{ path: '/member/list' }">회원 목록</v-list-item>
      <v-list-item :to="{ path: '/chat/group/list' }">채팅방 목록</v-list-item>

      <v-divider></v-divider>

      <v-list-item v-if="isLogin" :to="{ path: '/my/chat/page' }">My Chat</v-list-item>
      <v-list-item v-if="!isLogin" :to="{ path: '/member/create' }">회원가입</v-list-item>
      <v-list-item v-if="!isLogin" :to="{ path: '/login' }">로그인</v-list-item>
      <v-list-item v-if="isLogin" @click="doLogout">로그아웃</v-list-item>

    </v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      drawer: false,
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isLogin = true;
    }
  },
  methods: {
    doLogout() {
      localStorage.clear();
      this.isLogin = false;     
      alert("로그아웃 되었습니다.");
      this.$router.push("/login");
    }
  }
};
</script>
