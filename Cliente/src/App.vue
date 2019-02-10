<template>
    <div id="app">
        <bar-nav></bar-nav>
        <keep-alive>
            <router-view/>
        </keep-alive>
        <my-footer></my-footer>
        <div>
            <beautiful-chat
                    :participants="participants"
                    :titleImageUrl="titleImageUrl"
                    :onMessageWasSent="onMessageWasSent"
                    :messageList="messageList"
                    :newMessagesCount="newMessagesCount"
                    :isOpen="isChatOpen"
                    :close="closeChat"
                    :open="openChat"
                    :showEmoji="true"
                    :showFile="false"
                    :showTypingIndicator="showTypingIndicator"
                    :colors="colors"
                    :alwaysScrollToBottom="alwaysScrollToBottom"
                    :messageStyling="messageStyling"/>
        </div>
        <notifications group="foo"/>
    </div>
</template>

<script>
    import BarNav from '@/components/BarNav';
    import MyFooter from '@/components/MyFooter';

    export default {
        name: 'app',
        components: {
            BarNav,
            MyFooter
        },
        data() {
            return {
                participants: [],
                titleImageUrl: 'http://i68.tinypic.com/2n88riv.jpg',
                messageList: [],
                newMessagesCount: 0,
                isChatOpen: false,
                showTypingIndicator: '',
                colors: {
                    header: {
                        bg: '#34495e',
                        text: '#ecf0f1'
                    },
                    launcher: {
                        bg: '#34495e'
                    },
                    messageList: {
                        bg: '#2c3e50'
                    },
                    sentMessage: {
                        bg: '#7f8c8d',
                        text: '#ecf0f1'
                    },
                    receivedMessage: {
                        bg: '#95a5a6',
                        text: '#ecf0f1'
                    },
                    userInput: {
                        bg: '#34495e',
                        text: '#ecf0f1'
                    }
                },
                alwaysScrollToBottom: false,
                messageStyling: true
            }
        },
        sockets: {
            updateUsuarios: function (listaUsuarios) {
                let aux = JSON.parse(listaUsuarios);
                this.participants = aux;
                this.$notify({
                    group: 'foo',
                    title: 'IMPORTANTE',
                    text: 'Se ha conectado ' + aux[aux.length - 1].name
                });
            },
            usuariosConectados: function (lista) {
                let aux = JSON.parse(lista);
                this.participants = aux;
            },
            acutalizarMensajes: function (mensaje) {
                this.messageList.push(JSON.parse(mensaje));
                this.$notify({
                    group: 'foo',
                    title: 'IMPORTANTE',
                    text: 'Mensaje en el chat recibido'
                });
            },
            recibirMensajes: function (listaMensajes) {
                this.messageList = JSON.parse(listaMensajes);
            }
        },
        methods: {
            sendMessage(text) {
                if (text.length > 0) {
                    this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1;
                    this.onMessageWasSent({author: '', type: 'text', data: {text}});
                }
            },
            onMessageWasSent(message) {
                this.messageList = [...this.messageList, message];
                this.$socket.emit('Message', JSON.stringify(message));
            },
            openChat() {
                this.isChatOpen = true;
                this.newMessagesCount = 0;
            },
            closeChat() {
                this.isChatOpen = false;
            }
        }
    }
</script>

<style scoped>
</style>