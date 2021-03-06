#!/usr/bin/env python

from twisted.internet import reactor, task
from json import loads
from random import randint

from autobahn.twisted.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory


class MyServerProtocol(WebSocketServerProtocol):

    def __init__(self):
        super(MyServerProtocol, self).__init__()
        self.fill_timeout = 5.0
        self.fill_looping_call = task.LoopingCall(self.send_fill)

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")

        # Start looping calls.
        self.fill_looping_call.start(self.fill_timeout)

    def onMessage(self, payload, is_binary):
        assert not is_binary
        print("Text message received: {0}".format(payload.decode('utf8')))
        message = loads(payload)
        assert 'type' in message
        if message['type'] == 'CONFIG':
            self.handle_config(message)
        else:
            print("Unhandle message type {}".format(message['type']))

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))

    def handle_config(self, message):
        assert 'fill_timeout' in message
        self.fill_timeout = message['fill_timeout']

        self.fill_looping_call.stop()
        self.fill_looping_call.start(self.fill_timeout)

    def send_fill(self):
        self.sendMessage(generate_fill(), False)


sides = ['BUY', 'SELL']
base_price = 97.0
tick_increment = 0.0025

def generate_fill():
    return '{{"type":"FILL","instrument":{},"side":{},"quantity":{},"price":{}}}'.format(
        'XTH6', sides[randint(0, 1)], randint(1,100), base_price + randint(-25, 25) * tick_increment)

if __name__ == '__main__':

    import sys

    from twisted.python import log

    log.startLogging(sys.stdout)

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000")
    factory.protocol = MyServerProtocol
    # factory.setProtocolOptions(maxConnections=2)

    reactor.listenTCP(9000, factory)
    reactor.run()

