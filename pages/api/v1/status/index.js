function status(request, response) {
  response.status(200).json({ chave: "ruan signori" });
}

export default status;
