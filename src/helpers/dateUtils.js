const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) ;
}
 
export default formatDateTime;