// import React, { Component } from 'react';
// import { Form, Select, Input, Button } from 'antd';
// import { inboxInstance } from '../instances';
// import web3 from '../web3';

// const FormItem = Form.Item;

// class App extends React.Component {
//   state = { message: 'xyz' };

//   componentDidMount() {
//     this.refreshMessage();
//   }

//   refreshMessage = () => {
//     inboxInstance.methods
//       .message()
//       .call()
//       .then(message => {
//         this.setState({ message });
//       });
//   };

//   handleSubmit = async e => {
//     e.preventDefault();
//     const accounts = await web3.eth.getAccounts();
//     await inboxInstance.methods.setMessage(this.state.value).send({
//       from: accounts[0]
//     });
//     this.refreshMessage();
//   };

//   render() {
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <FormItem label="Note">
//           <Input onChange={e => this.setState({ value: e.target.value })} />
//         </FormItem>

//         <FormItem wrapperCol={{ span: 12, offset: 5 }}>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </FormItem>

//         <p>{this.state.message}</p>
//       </Form>
//     );
//   }
// }

// export const Inbox = Form.create()(App);
