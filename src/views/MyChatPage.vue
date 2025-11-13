<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">나의 채팅 목록</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                
                                <th>채팅방 이름</th>
                                <th>읽지 않은 메세지</th>
                                <th>액션</th>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="chat in chatList" :key="chat.roomId">
                                    <td>{{ chat.roomName }}</td>
                                    <td>{{ chat.unReadCount }}</td>
                                    <td>
                                        <v-btn color="primary" @click="enterChatRoom(chat.roomId)">입장</v-btn>
                                        <v-btn color="secondary" :disabled="chat.isGroupChat === 'N' " @click="leaveChatRoom(chat.roomId)">나가기</v-btn>
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
    import axios from "axios";

    export default {

        data(){
            return {
                chatList : []
            }
        },

        async created(){
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/chat/my/rooms`);
            this.chatList = response.data;
            console.log(this.chatList);
        },

        methods: {
            enterChatRoom(roomId){
                this.$router.push(`/chatPage/${roomId}`);
            },

            async leaveChatRoom(roomId){
                await axios.delete(`${process.env.VUE_APP_API_URL}/chat/room/group/${roomId}/leave`);
                this.chatList = this.chatList.filter(chat => chat.roomId !== roomId);
            }
        }

    }
</script>