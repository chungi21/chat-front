<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class=" text-h5">회원 목록</v-card-title>
                    <v-card-text>
                        <v-table>
                            <tbody class="" >
                                <tr v-for="member in memberList" :key="member.id">
                                    <td class="text-left">
                                        <strong>이름 : </strong>{{ member.name }} <br>
                                        <strong>이메일 : </strong>{{ member.email }}
                                    </td>
                                    
                                    <td class=" fixed-col1">
                                        <v-btn 
                                            class="bg-grey-lighten-3"
                                            v-if="member.email === myEmail"
                                            disabled
                                        >
                                            본인계정
                                        </v-btn>

                                        <v-btn 
                                            v-else 
                                            color="primary" 
                                            @click="startChat(member.id)"
                                        >
                                            채팅하기
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>

                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    data() {
      return {
        memberList: [],
        myEmail: localStorage.getItem("email"),
      };
    },

    async created() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_API_URL}/member/list`
        );
        this.memberList = response.data;
      } catch (e) {
        console.error("회원 목록 조회 실패:", e);
      }
    },

    methods: {
      async startChat(chatMemberId) {
        try {
          // 기존의 채팅방이 있는지 확인 - 없으면 새롭게 방 생성
          const response = await this.$axios.post(
            `${process.env.VUE_APP_API_URL}/chat/room/private/create?chatMemberId=${chatMemberId}`
          );
          const chatRoomId = response.data;
          this.$router.push(`/chatpage/${chatRoomId}`);
        } catch (e) {
          // 인터셉터에서 처리됨
        }
      },
    },
  };
</script>
