<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">회원 목록</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <th>ID</th>
                                <th>이름</th>
                                <th>email</th>
                                <th>채팅</th>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="member in memberList" :key="member.id">
                                    <td>{{ member.id }}</td>
                                    <td>{{ member.name }}</td>
                                    <td>{{ member.email }}</td>
                                    <td>
                                        <v-btn color="primary" @click="startChat(member.id)">채팅하기</v-btn>
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
                memberList : []
            }
        },

        async created(){
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/member/list`);
            this.memberList = response.data;
        },

        methods: {
            async startChat(chatMemberId){
                // 기존의 채팅방이 있는지 확인 - 없으면 새롭게 방 생성
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/chat/room/private/create?chatMemberId=${chatMemberId}`);
                console.log(response.data);
                const chatRoomId = response.data;
                this.$router.push(`/chatpage/${chatRoomId}`);
            }
        }

    }
</script>