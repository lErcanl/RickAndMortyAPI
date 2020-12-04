export const err = {
    error: (response) => {
     if (!response.ok) {
         throw Error(response.statusText);
     }
     return response.json();
         
         
  }
  
 }