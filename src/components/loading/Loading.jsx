import React from 'react'
import {HashLoader, RingLoader} from 'react-spinners'

const Loading = () => {
  return (
      <div style={{
      display: 'flex',
        flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
      height: "50vh",
      gap: "20px"
    }}>
      <RingLoader
        
        
        color="black"
      />
      Please wait....
    </div>
  );
}

export default Loading
