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

const fetchAndRenderProjects = async () => {
  const projectContainer = document.getElementById("project-list-container");

  if (!projectContainer) return;

  try {
    // Gọi dữ liệu từ file JSON cục bộ
    const response = await fetch("js/data.json");

    // Ném lỗi nếu đường dẫn sai hoặc file không tồn tại
    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Biến đổi dữ liệu thành các thẻ HTML tương ứng
    const projectsHTML = data
      .map(
        (project) => `
            <div class="project-item">
                <h3>Dự án: ${project.ten}</h3>
                <p><strong>Công nghệ:</strong> ${project.congNghe}</p>
                <p><strong>Năm:</strong> ${project.namHoanThanh}</p>
            </div>
        `,
      )
      .join("");

    // Hiển thị ra màn hình
    projectContainer.innerHTML = projectsHTML;
  } catch (error) {
    // Bắt lỗi: in ra console và thông báo cho người dùng thay vì crash web
    console.error("Lỗi khi tải dữ liệu dự án:", error);
    projectContainer.innerHTML = `<p style="color: red;">Không thể tải danh sách dự án. Vui lòng thử lại sau.</p>`;
  }
};

// 3. Sử dụng LocalStorage cho tính năng Chế độ Sáng/Tối (Dark Mode)
const setupThemeToggle = () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const bodyElement = document.body;

  if (!themeToggleButton) return;

  // Kiểm tra trạng thái đã lưu trong LocalStorage khi trang vừa tải
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    bodyElement.classList.add("dark-mode");
    themeToggleButton.textContent = "Chế độ Sáng";
  }

  // Xử lý sự kiện khi người dùng click vào nút
  themeToggleButton.addEventListener("click", () => {
    // Bật/tắt class 'dark-mode'
    bodyElement.classList.toggle("dark-mode");

    // Cập nhật lại LocalStorage và text hiển thị
    if (bodyElement.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeToggleButton.textContent = "Chế độ Sáng";
    } else {
      localStorage.setItem("theme", "light");
      themeToggleButton.textContent = "Chế độ Tối";
    }
  });
};
// Gọi các hàm khi tài liệu HTML đã được tải xong
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  handleFormSubmit();

  fetchAndRenderProjects();
  setupThemeToggle();
});
