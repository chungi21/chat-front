<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="text-center text-h5">채팅</v-card-title>
                    <v-card-text>
                        <div class="chat-box">
                            <div
                            v-for="(msg, index) in messages" 
                            :key="index"
                            :class="['chat-message', msg.senderEmail === this.senderEmail ? 'sent' : 'received']"
                            >
                                <strong>{{ msg.senderEmail }}:</strong> {{ msg.message }}
                            </div>
                        </div>
                        <v-text-field
                            v-model="newMessage"
                            label="메시지를 입력하세요"
                            @keyup.enter="sendMessage"
                        ></v-text-field>
                        <v-btn color="primary" block @click="sendMessage">전송</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script> 
    import SockJS from "sockjs-client";
    import Stomp from "webstomp-client";
    // import axios from "axios";

    export default {
        data(){
            return {
                messages: [],
                newMessage: '',
                stompClient : null,
                token : "",
                senderEmail : "",
                roomId : null
            }
        },

        created(){
            this.senderEmail = localStorage.getItem("email");
            this.roomId = this.$route.params.roomId;
            this.connectWebSocket();
        },

        beforeRouteLeave(to, from, next) {
            this.disconnectWebSocket();
            next();
        },

        beforeUnmount() {
            this.disconnectWebSocket();
        },

        methods: {
            connectWebSocket() {
                if(this.stompClient && this.stompClient.connected) return;

                // sockJs는 webSocket을 내장한 향상된 js 라이브러리. http 엔드포인트 사용.
                const sockJs = new SockJS(`${process.env.VUE_APP_API_URL}/connect`);
                this.stompClient = Stomp.over(sockJs);
                this.token = localStorage.getItem("token");

                this.stompClient.connect({
                    Authorization : `Bearer ${this.token}`
                }, () => {
                    console.log('Stomp 연결 성공');

                    this.stompClient.subscribe(`/topic/${this.roomId}`, (message) => {
                        const parsedMessage = JSON.parse(message.body);
                        this.messages.push(parsedMessage);
                        this.scrollToBottom();
                    });
                });
            },
            
            sendMessage() {
                if(this.newMessage.trim() === '') return;
                const message = {
                    senderEmail : this.senderEmail,
                    message : this.newMessage
                }

                this.stompClient.send(`/publish/${this.roomId}`, JSON.stringify(message));
                this.newMessage = '';
            },

            scrollToBottom() {
                this.$nextTick(() => {
                    const chatBox = this.$el.querySelector('.chat-box');
                    chatBox.scrollTop = chatBox.scrollHeight;
                });
            },

            disconnectWebSocket() {
                if (this.stompClient && this.stompClient.connected) {
                    this.stompClient.unsubscribe(`/topic/${this.roomId}`);
                    this.stompClient.disconnect();
                    this.stompClient = null;
                }
            }   
        }
    }

</script>

<style>
.chat-box {
    height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}

.chat-message {
    margin-bottom: 8px;
}

.sent {
    text-align: right;
}

.received {
    text-align: left;
}
</style>