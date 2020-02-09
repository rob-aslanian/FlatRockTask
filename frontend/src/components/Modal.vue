<template  >
   <transition name="modal">
    <div class="modal-mask">
        <div class="modal-container">
            <button class="close" @click="$emit('close')">
                  <i class="material-icons">close</i>
            </button>
            <div class="modal-body">
                <slot ></slot>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
    created() {
        // Close modal on esc keyword // 
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.$emit("close");
            }
        }

        document.addEventListener('keydown', escapeHandler);

        this.$once('hook:destroyed', () => {
            document.removeEventListener('keydown', escapeHandler);
        });
    }
}
</script>

<style lang="scss">
.close{
    background: unset;
    border: unset;
    float: right;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#00000029, .5);
  transition: .3s opacity ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 45vw;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(#00000029, .33);
  transition: .3s all ease;

}

.modal-body { margin-top: 2rem; }

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}

</style>