<template>
    <div>
        <section class="section sec4 contact active" id="contact">
            <div class="gradient-box-top"></div>
            <div class="gradient-box-bottom"></div>
            <div class="contact-container">
                <div class="main-title">
                    <h2>Contact <span>Me</span></h2>
                </div>
                <div class="contact-content-con">
                    <div class="left-contact">
                        <h4>Contact me here</h4>
                        <div class="contact-info">
                            <div class="contact-item">
                                <div class="icon">
                                    <v-icon>mdi-map-marker</v-icon>
                                    <span>Location</span>
                                </div>
                                <p>
                                    : Bucharest, Romania
                                </p>
                            </div>
                            <div class="contact-item">
                                <div class="icon">
                                    <v-icon>mdi-email-variant</v-icon>
                                    <span>Email</span>
                                </div>
                                <p>
                                    <span>: vlad.mocanu13@gmail.com</span>
                                </p>
                            </div>
                            <div class="contact-item">
                                <div class="icon">
                                    <v-icon>mdi-phone</v-icon>
                                    <span>Mobile Number</span>
                                </div>
                                <p>
                                    <span>: +40732356562</span>
                                </p>
                            </div>
                            <div class="contact-item">
                                <div class="icon">
                                    <v-icon>mdi-earth</v-icon>
                                    <span>Languages</span>
                                </div>
                                <p>
                                    <span>: Romanian, English</span>
                                </p>
                            </div>
                        </div>
                        <div class="contact-icons">
                            <div class="contact-icon">
                                <a href="https://www.linkedin.com/in/vlad-george-m-b83a5616b/" target="_blank">
                                    <v-icon>mdi-linkedin</v-icon>
                                </a>
                                <a href="https://codepen.io/vladm13" target="_blank">
                                    <v-icon>mdi-codepen</v-icon>
                                </a>
                                <a href="https://github.com/MockingYou" target="_blank">
                                    <v-icon>mdi-github</v-icon>
                                </a>
                                <a href="https://www.youtube.com/channel/UCv8svFTVTem9lKKaL4nWOmA" target="_blank">
                                    <v-icon>mdi-youtube</v-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="right-contact">
                        <div class="contact-form">
                            <div class="input-container">
                                <div class="input-control i-c-2">
                                    <input type="text" v-model="name" required placeholder="YOUR NAME"> 
                                    <input :class="{ 'error': emailError }" type="email" v-model="email" required placeholder="YOUR EMAIL" @input="validateEmail">
                                </div>
                                <span v-if="emailError" class="error-message">{{ emailError }}</span>
                            </div>
                            <div class="input-control">
                                <input type="text" v-model="subject" required placeholder="ENTER SUBJECT">
                            </div>
                            <div class="input-control">
                                <textarea v-model="message" id="" cols="15" rows="8" placeholder="Message Here..."></textarea>
                            </div>
                            <div>
                                <button class="mail-btn" @click="sendEmail"> Send Email <v-icon class="send-icon">mdi-send</v-icon ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Toast :type="toast.type" :message="toast.message" :duration="toast.duration" :icon="toast.icon" v-if="toast.visible" />
    </div>
</template>

<script>
import axios from 'axios'
import Toast from '../components/ui/Toast.vue';
import { showToast } from '../utils/toast';

export default {
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      emailError: '',
      toast: {
        type: '',
        message: '',
        duration: 3000,
        visible: false,
        icon: '',
      }
    };
  },
  components: {
    Toast
  },
  methods: {
    validateEmail() {
        const regex = /\S+@\S+\.\S+/;
        if(!regex.test(this.email)) {
            this.emailError = 'Please enter a valid email address';
        } else {
            this.emailError = '';
        }
    },  
    async sendEmail() {
            this.validateEmail();
            const emailData = {
              name: this.name,
              email: this.email,
              subject: this.subject,
              message: this.message,
            }
            if (!this.emailError) {
                try {
                  const response = await axios.post('https://portfolio-service-1j6y.onrender.com/api/Project/SendEmail', emailData, {
                    withCredentials: false
                  });
                  if (response.data === 'Email sent') {
                    this.name = '';
                    this.email = '';
                    this.subject = '';
                    this.message = '';
                    this.showToast('success', 'Email sent successfully.', 'mdi-check-circle-outline');
                  } else {
                    this.showToast('error', 'Failed to send email. Please try again later.', 'mdi-alert-outline');
                  }
                } catch (error) {
                  this.showToast('error', 'An error occurred while sending the email. Please try again later.', 'mdi-alert-outline');
                }
            }
        },
        showToast(type, message, icon) {
            this.toast = showToast(type, message, 3000, icon);
        }
    },
};
</script>

<style scoped>

.input-container {
  position: relative;
}

.error-message {
  margin-top: -25px;
  position: absolute;
  right: 0;
  color: rgb(255, 60, 60);
  font-size: 15px;
}

.send-icon {
    margin-left: 20px;
    padding-bottom: 15px;
    transform: rotate(-45deg);
}
</style>