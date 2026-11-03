// Khai báo mảng object dữ liệu
const skillsData = [
  { id: 1, name: "HTML5", level: "Tốt", isVisible: true },
  { id: 2, name: "CSS3 / SCSS", level: "Tốt", isVisible: true },
  { id: 3, name: "JavaScript", level: "Khá", isVisible: true },
  { id: 4, name: "C++", level: "Cơ bản", isVisible: true },
  { id: 5, name: "Java", level: "Cơ bản", isVisible: true },
  { id: 6, name: "Kỹ năng ẩn", level: "Yếu", isVisible: false }, // Sẽ bị filter lọc đi
];

// Arrow function để xử lý và hiển thị danh sách kỹ năng
const renderSkills = () => {
  const skillsList = document.getElementById("skills-list");

  if (skillsList) {
    // Dùng filter để lọc ra các kỹ năng được phép hiển thị (isVisible === true)
    const visibleSkills = skillsData.filter((skill) => skill.isVisible);

    // Dùng map để biến đổi mảng object thành mảng các chuỗi HTML
    const skillsHTML = visibleSkills
      .map((skill) => {
        return `<li>${skill.name} - ${skill.level}</li>`;
      })
      .join("");

    // 2. THAO TÁC DOM HIỂN THỊ DANH SÁCH (Không hardcode)
    skillsList.innerHTML = skillsHTML;
  }
};

//sử lí sk
const handleFormSubmit = () => {
  const contactForm = document.querySelector(".formlienhe form");

  if (contactForm) {
    // Tạo một thẻ <div> để chứa thông báo lỗi/thành công
    const messageBox = document.createElement("div");
    messageBox.id = "form-message";
    messageBox.style.marginBottom = "15px";
    messageBox.style.textAlign = "center";

    // SỬA LỖI Ở ĐÂY: Chèn thẻ messageBox ra BÊN NGOÀI thẻ form (nằm trên form)
    // để không làm sai lệch số lượng cột (CSS Grid) bên trong form.
    contactForm.parentNode.insertBefore(messageBox, contactForm);

    // Xử lý sự kiện bằng addEventListener
    contactForm.addEventListener("submit", function (event) {
      // Ngăn chặn form tải lại trang mặc định của HTML
      event.preventDefault();

      // Lấy giá trị từ các ô input
      const nameValue = document.getElementById("name").value.trim();
      const emailValue = document.getElementById("email").value.trim();
      const messageValue = document.getElementById("message").value.trim();

      let errors = [];

      // Validate bổ sung bằng JavaScript (Ngoài validate required của HTML5)
      if (nameValue.length < 3) {
        errors.push("Họ tên phải có ít nhất 3 ký tự.");
      }

      // Regex kiểm tra định dạng email hợp lệ
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        errors.push("Email không đúng định dạng.");
      }

      if (messageValue.length < 10) {
        errors.push("Nội dung tin nhắn phải dài hơn 10 ký tự.");
      }

      // Hiển thị thông báo
      if (errors.length > 0) {
        // NẾU CÓ LỖI: Hiển thị chữ màu đỏ, dùng map để in từng lỗi
        messageBox.style.color = "red";
        messageBox.innerHTML = errors.map((err) => `<p>❌ ${err}</p>`).join("");
      } else {
        // NẾU THÀNH CÔNG: Hiển thị chữ màu xanh, báo thành công và xóa trắng form
        messageBox.style.color = "green";
        messageBox.innerHTML = "<p>✅ Gửi tin nhắn thành công! Cảm ơn bạn.</p>";
        contactForm.reset();
      }
    });
  }
};

// Gọi các hàm khi tài liệu HTML đã được tải xong (DOM Content Loaded)
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  handleFormSubmit();
});
