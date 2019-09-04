import React from 'React';
class HelloMessage extends React.Component {
  render() {
    console.log(PRODUCT)
    return (
      <div style={{color:'red'}}>
        Hello {this.props.name}  {PRODUCT?'生产环境':'开发环境'}
      </div>
    );
  }
}

export default HelloMessage;