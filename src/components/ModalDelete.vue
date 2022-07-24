<template>
  <b-modal
    :id="`modal-delete-${id}`"
    size="lg"
    title="Excluir Tarefa"
    footer="modal-footer"
  >
   <p>Deseja excluir o registro?</p>

    <template #modal-footer>
      <div class="w-100">  
       
        <b-button
          class="float-right ml-2"
          size="sm"
          variant="warning"
          @click="deleteTask(`modal-delete-${id}`)"
          :disabled="spinner.edit"
        >
          <img
            v-if="spinner.edit"
            src="@/assets/img/spinner.svg"
            alt=""
            width="20"
            height="20"
            class="d-inline-block"
          />
          Excluir Tarefa
        </b-button>

        <b-button
          class="float-right"
          size="sm"
          variant="danger"
          @click="hideModal(`modal-delete-${id}`)"
        >
          Cancel
        </b-button>
      </div>
    </template>
   
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
        type: Number,
        required: true,
    },
  },
  data: () => ({   
    spinner: {
      edit: false,
    },
  }), 
  methods: {
    hideModal(modalId) {
      this.spinner.edit = false;
      this.$root.$emit("bv::hide::modal", modalId);
    },

    async deleteTask(modalId) {
      this.spinner.edit = true;

      const payload = {
        id: this.id,      
      };

      this.$axios
        .delete(`/tasks/${this.id}`, payload)
        .then((response) => {
          console.log(response);
          this.$emit("loadTasks");
        })
        .catch((e) => {
          this.spinner.login = false;
          console.log(e);
        })
        .finally(() => {
          this.spinner.login = false;
        });

      //fechar a modal
      this.hideModal(modalId);
     
    },
  },
  
};
</script>

<style scoped>

.text-size {
    font-size: 1rem;
}
</style>
