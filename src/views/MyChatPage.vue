<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-h5">나의 채팅 목록</v-card-title>
                    <v-card-text>
                        <v-table>
                            <tbody class="">
                                <tr v-for="chat in chatList" :key="chat.roomId">
                                    <td>
                                        <div>
                                            <div 
                                                :class="chat.isGroupChat === 'Y' ? 'isgroup group' : 'isgroup'"
                                            >
                                                {{ chat.isGroupChat === 'Y' ? '오픈 채팅방' : '개인 채팅방' }}
                                            </div>
                                        </div>
                                        {{ chat.roomName }} <span class="no-read">{{ chat.unReadCount }}</span> 
                                    </td>
                                    
                                    <td class="fixed-col2">
                                        <v-btn color="primary mr-2" @click="enterChatRoom(chat.roomId)">입장하기</v-btn>
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

