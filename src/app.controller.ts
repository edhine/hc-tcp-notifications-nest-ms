import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() { }

  @EventPattern('message_printed')
  async handleMessagePrintedEvent(data: Record<string, unknown>) {
    console.log('Event:', data.text);
  }


  @MessagePattern({ cmd: 'send' })
  async handleMessagePrintedSend(data: Record<string, unknown>) {
    console.log('Send:', data.text);
    return data.text;
    // return (data || []).reduce((a, b) => a + b);
  }
}
