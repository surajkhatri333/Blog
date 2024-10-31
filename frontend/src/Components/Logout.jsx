// export const handleLogout = async () => {
//     // setisLogin(false);
//     // setuserEmail('');

//     await axios.post("http://localhost:8080/logout", {}, { withCredentials: true })
//     .try(response => {
//         setisLogin(false);
//         setuserEmail(null); // Clear user email
//     })
//     .catch(error => {
//         console.error("Logout failed", error);
//     });
//   }