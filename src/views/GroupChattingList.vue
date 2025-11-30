<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-h5 d-flex justify-space-between align-center">
                        오픈 채팅방 목록
                        <v-btn color="secondary"  @click="showCreateRoomModal = true">
                            오픈 채팅방 만들기
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <tbody class="">
                                <tr v-for="chat in chatRoomList" :key="chat.roomId">
                                    <td>{{ chat.roomName }}</td>
                                    <td class="fixed-col1">
                                        <v-btn color="primary" @click="joinChatRoom(chat.roomId)">
                                        참여하기 <v-icon>mdi-account-plus</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="showCreateRoomModal" max-width="500">
            <v-card>
                <v-card-title class="text-h6">
                    오픈 채팅방 제목
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="newRoomTitle" label="채팅방 제목을 입력하세요"     maxlength="15"
    counter="15"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="createChatRoom()">생성</v-btn>
                    <v-btn color="grey" @click="showCreateRoomModal = false">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>

export default {

    data(){
        return {
            chatRoomList : [],
            showCreateRoomModal : false,
            newRoomTitle : ''
        }
    },

    async created(){
        this.loadChatRooms();
    },

    methods: {

async joinChatRoom(roomId) {
  try {
    await this.$axios.post(
      `${process.env.VUE_APP_API_URL}/chat/room/group/${roomId}/join`
    );
    this.$router.push({ path: `/chatpage/${roomId}` });
  } catch (error) {
    // 인터셉터에서 처리됨
  }
},

async createChatRoom() {
  try {
    await this.$axios.post(
      `${process.env.VUE_APP_API_URL}/chat/room/group/create?roomName=${this.newRoomTitle}`,
      null
    );
    this.showCreateRoomModal = false;
    this.loadChatRooms();
  } catch (error) {
    // 인터셉터에서 처리됨
  }
},


async loadChatRooms() {
  try {
    const response = await this.$axios.get(
      `${process.env.VUE_APP_API_URL}/chat/room/group/list`
    );
    this.chatRoomList = response.data;
  } catch (error) {
    // 인터셉터에서 처리됨
  }
}

        
    }

}
</script>

