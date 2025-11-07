<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">

                <v-card>
                    <v-card-title class="text-h5 text-ceter" >
                        로그인
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="doLogin">

                            <v-text-field 
                            label="이메일"
                            v-model="email"
                            type="email"
                            required
                            ></v-text-field>

                            <v-text-field 
                            label="비밀번호"
                            v-model="password"
                            type="password"
                            required
                            ></v-text-field>

                            <v-btn type="submit" color="primary" block>로그인</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import axios from "axios";
    import { jwtDecode } from "jwt-decode";

    export default {

        data(){
            return {
                email : "",
                password : ""
            }   
        },

        created(){

        },

        methods:{
            async doLogin(){
                const loginData = {
                    email : this.email,
                    password : this.password
                };

                const response = await axios.post(`${process.env.VUE_APP_API_URL}/member/doLogin`, loginData);

                // 받아온 token localStorage에 저장
                const token = response.data.token; 
                localStorage.setItem("token", token);

                // 사용자 정보 디코딩 후 localStorage에 저장
                const role = jwtDecode(token).role;
                const email = jwtDecode(token).sub;
                
                localStorage.setItem("role", role);
                localStorage.setItem("email", email);

                // 메인 페이지로 이동
                this.$router.push("/").then(() => {
                    window.location.reload();
                });
            }   
        }

    }  
</script>