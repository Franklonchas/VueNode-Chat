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
                participants: [], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
                titleImageUrl: 'http://i68.tinypic.com/2n88riv.jpg',
                messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
                newMessagesCount: 0,
                isChatOpen: false, // to determine whether the chat window should be open or closed
                showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
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
                }, // specifies the color scheme for the component
                alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
                messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
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
                // called when the user sends a message
                this.messageList = [...this.messageList, message];
                this.$socket.emit('Message', JSON.stringify(message));
            },
            openChat() {
                // called when the user clicks on the fab button to open the chat
                this.isChatOpen = true;
                this.newMessagesCount = 0;
            },
            closeChat() {
                // called when the user clicks on the button to close the chat
                this.isChatOpen = false;
            }
        }
    }
</script>


<style scoped>
</style>