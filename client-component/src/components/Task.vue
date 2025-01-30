<template>
  <div>                
    <div class="task-header">{{ task.User.first_name }} {{ task.User.last_name }}</div>
    <div class="task-title-container">
      <div class="task-title">{{task.title}}</div>
    </div>
    <div class="task-bottom-container">
      <div class="due-date">{{ formatDueDate(task.due_date) }}</div>
      <button @click="showTaskDetails(task.id)" type="button" class="btn mt-2 btn-sm task-edit-icon"><img src="../assets/task-content.svg" width="20" height="20"></button>
    </div>
    <div class="task-updatedAt">{{ formatUpdatedAt(task.updatedAt) }}</div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      TaskId: 0,
      taskEditData: {
        title: "",
        description: "",
        due_date: ""
      }
    }
  },
  methods: {
    showTaskDetails(TaskId) {
      this.TaskId = TaskId;
      this.fetchEditData(TaskId);
    },
    formatDueDate(due_date) {
      let months = new Array();
          months[1] = "Jan";
          months[2] = "Feb";
          months[3] = "Mar";
          months[4] = "Apr";
          months[5] = "May";
          months[6] = "Jun";
          months[7] = "Jul";
          months[8] = "Aug";
          months[9] = "Sep";
          months[10] = "Oct";
          months[11] = "Nov";
          months[12] = "Dec";

      // let d = new Date(due_date),	// Convert the passed timestamp to milliseconds
      // yyyy = d.getFullYear(),
      // mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
      // dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
      // date;
      const [yyyy, mm, dd] = due_date.split("-");
      const monthName = months[Number(mm)];
      //remove leading zero
      
      const ddArr = dd.split("");
      let ddFormated = ddArr[0] === "0" ? ddArr[1] : dd;
      const date= `${ddFormated} ${monthName} ${yyyy}`;
      return date;
    },
    formatUpdatedAt(updatedAt) {
      let months = new Array();
          months[1] = "Jan";
          months[2] = "Feb";
          months[3] = "Mar";
          months[4] = "Apr";
          months[5] = "May";
          months[6] = "Jun";
          months[7] = "Jul";
          months[8] = "Aug";
          months[9] = "Sep";
          months[10] = "Oct";
          months[11] = "Nov";
          months[12] = "Dec";

      let d = new Date(updatedAt),	// Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
      ampm = 'AM',
      time,
      timeStamp;

      if (hh > 12) {
          h = hh - 12;
          ampm = 'PM';
      } else if (hh === 12) {
          h = 12;
          ampm = 'PM';
      } else if (hh == 0) {
          h = 12;
      }
      
      let monthName = months[Number(mm)];
      time = h + ':' + min + ' ' + ampm;
      timeStamp= `${dd} ${monthName} ${yyyy}, ${time}`;
      
      return timeStamp;
    },
    fetchEditData(TaskId) {
      axios({
          url: `http://localhost:3000/tasks/${TaskId}`,
          method: "POST",
          withCredentials: true,
          headers: {
              access_token: localStorage.getItem("access_token")
          }
      })
      .then(({data}) => {
          this.taskEditData.title = data.title;
          this.taskEditData.description = data.description;
          this.taskEditData.due_date = data.due_date;
          this.$emit("setTaskId", this.TaskId);
          this.$emit("setTaskEditData", this.taskEditData);
          this.$emit("show-task-details");
      })
      .catch((err) => {
          console.log(err);
      })
    }
  },
}
</script>
<style>
  
</style>