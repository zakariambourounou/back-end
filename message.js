//pour ce faire laisse toujours un message au dev front-end et informons ce dernier d'une erreur ou d'une validite 
//cela peut nous servire aussi 

 export const succes = (message, data)=>{
    return {
        message:message,
        data:data
    }
}
//creons un id unique 
export const creer_id = (clients)=>{
  const client_id = clients.map(client =>client.id)
  const comp_id = client_id.reduce((a,b)=>Math.max(a,b))
  const unique = comp_id + 1

  return unique
}

