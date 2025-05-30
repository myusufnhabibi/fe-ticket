<script setup>
// TODO: Import necessary dependencies
// Hint: You'll need to import from vue, pinia, lodash, feather-icons, luxon, and vue-router
// TODO: Initialize ticket store and get necessary refs
// Hint: Use useTicketStore() and storeToRefs()
// TODO: Create route instance
// Hint: Use useRoute()
// TODO: Create refs for ticket and form
// Hint: You'll need ticket object and form with status and content fields
const ticket = ref({});
const form = ref({
  status: "",
  content: "",
});
// TODO: Get store methods and refs
// Hint: Destructure success, error, loading from storeToRefs
// Hint: Destructure fetchTicket and createTicketReply methods
// TODO: Implement fetchTicketDetail function
// Hint: This should fetch ticket details using code from route params
// Then update ticket and form status
const fetchTicketDetail = async () => {
  const response = await fetchTicket(route.params.code);
  ticket.value = response;
  form.value.status = response.status;
};
// TODO: Implement handleSubmit function
// Hint: This should call createTicketReply with code and form
// Then refetch ticket details
const handleSubmit = async () => {
  await createTicketReply(route.params.code, form.value);
  await fetchTicketDetail();
};

onMounted((async) => {
  // await fetchTicketDetail()

  feather.replace();
});
</script>
