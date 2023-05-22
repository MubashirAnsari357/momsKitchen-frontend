export const dateConvert = (createdAt) => {
    
    const orderDate = new Date(createdAt);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    
    const formattedDate = orderDate.toLocaleDateString("en-US", options);

    return formattedDate;

}
