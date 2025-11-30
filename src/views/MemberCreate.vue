<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">

                <v-card>
                    <v-card-title class="text-h5 text-ceter" >
                        회원가입
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" @submit.prevent="memberCreate">
                            <v-text-field 
                                label="이름"
                                v-model="name"
                                :rules="[v => !!v || '이름을 입력하세요']"
                            ></v-text-field>

                            <v-text-field 
                                label="이메일"
                                v-model="email"
                                type="email"
                                :rules="[v => !!v || '이메일을 입력하세요']"
                            ></v-text-field>

                            <v-text-field 
                                label="비밀번호"
                                v-model="password"
                                type="password"
                                :rules="[v => !!v || '비밀번호를 입력하세요']"
                            ></v-text-field>

                            <v-btn type="submit" color="primary" block>회원 가입</v-btn>
                        </v-form>

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
                name : "",
                email : "",
                password : ""
            }   
        },

        created(){
            console.log("MemberCreate.vue created()......");    
        },

        methods:{
            
            async memberCreate() {
            const { valid } = await this.$refs.form.validate();

            if (!valid) {
                return;
            }

            const data = {
                name : this.name,
                email : this.email,
                password : this.password
            };
            await axios.post(`${process.env.VUE_APP_API_URL}/member/create`, data);
            this.$router.push("/");
            }

        }

    }  
</script>