<template>
  <div>
    <transition>
      <div class="container" v-if="tasks && tasks.length" key="hasTask">
        <h1>Tasks</h1>
        <div class="row">
          <div
            v-for="(task, index) in tasks"
            :key="index"
            class="col-sm-12 col-md-12 col-lg-12 mb-4 align-items-center"
          >
            <div class="card" style="">
              <div class="p-1 bg-primary">
                <p class="text-white font-weight-bold">
                  Finalizado: <span>{{ yesOrNo(task.done) }}</span>
                </p>
                <p class="text-white font-weight-bold">
                  Data limite: <span>{{ task.ends_at }}</span>
                </p>
                <div
                  class="d-flex position-relative"
                  style="height: auto; background: red !important"
                >
                  <b-badge class="position-absolute" variant="warning">{{
                    deadline(task.ends_at)
                  }}</b-badge>
                </div>
              </div>
              <div class="card-body">
                <span class="font-weight-bold"> Descrição: </span>
                <p class="card-text">
                  {{ task.description  }}
                </p>

                <ModalEdit :task="task" @loadTasks="getTasks"/>
              </div>

              <div class="card-footer">
                <b-button v-b-modal="`modal-${task.id}`">Edit</b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center mt-5">
          <Pagination :totalItems="totalItems"  />
        </div>
      </div>

      <div
        class="container height"
        v-else-if="tasks && tasks.length === 0"
        key="hasNoProduct"
      >
        <div class="row">
          <h2>Não há tasks a serem visualizados</h2>
        </div>
      </div>

      <div class="container height" v-else key="loading">
        <div class="row height justify-content-center align-items-center">
          <loading class="mt-5" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import ModalEdit from "@/components/ModalEdit.vue"

export default {
  components: {
    Pagination,
    ModalEdit
  },
  props: ["id"],
  data() {
    return {
      tasks: [],
      totalItems: 0,
      showModal: false,
      footer: "white",     
    };
  },
  computed: {
    url() {
      return `/todos/${this.id}/tasks?page=${Number(this.$route.query.page)}`;
    },
    yesOrNo() {
      return (param) => (param ? "sim" : "não");
    },
    deadline() {
      return (param) => {
        let splitedDate = param.split(" ");
        return Date.parse(splitedDate[0]) > Date.now()
          ? "Não Atrasado"
          : "Atrasado";
      };
    },
    
  },
  methods: {
    getTasks() {
      this.tasks = null;
      console.log('loadTasks kkkkkkkkkkk')

      this.$axios.get(this.url).then((response) => {
        console.log("tasks", response.data.data);
        this.tasks = response.data.data;
        this.totalItems = Number(response.data.meta.total);
      });
    },
    hideModal(modalId) {        
      this.$root.$emit("bv::hide::modal", modalId);
    },
  },
  watch: {
    url() {
      this.getTasks();
    },
  },
  created() {
    this.getTasks();
  },
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
a {
  text-decoration: none;
}
.container-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

div.card {
  min-height: 300px !important;
  border-radius: 4px;
}
.fake-img {
  width: 100%;
  height: 150px;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
  top: -20px;
  right: 0;
}

.height {
  height: 100vh !important;
}
</style>
