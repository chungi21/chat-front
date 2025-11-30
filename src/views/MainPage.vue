<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="4" md="6">

                <v-card>
                    <v-card-title class="text-h5 text-ceter" >
                        Welcome to Chatting App
                    </v-card-title>

                    <v-card-text>
                        - 본 채팅 애플리케이션은 Vue.js 기반의 프론트엔드와 Spring Boot 기반의 백엔드로 구성되어 있습니다.<br>
                        - WebSocket + Stomp를 이용한 간단 채팅 입니다.<br> 
                        - 다중 서버 환경의 실시간 동기화를 위한 Redis Pub/Sub이 적용되어 있습니다.<br>
                        - 트래픽 증가 대비를 위한 Nginx 기반 다중 서버 로드밸러싱 구현 및 테스트를 하였습니다.<br>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>