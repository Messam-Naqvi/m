import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";

import us from './Documentation/Graph_Theory.pdf'
import nlp from './Documentation/Nlp_Project_Report (1).pdf'
import Cafee from './Documentation/Cafe Project Documentation .pdf'
import legalink from './Documentation/Legal Link Documentation.pdf'
import Snap from './Documentation/Snapquiz_doc.pdf'

import Snapquiz from './Pictures/SnapQuiz.png';
import legallink from './Pictures/leglink.png';
import noscafe from './Pictures/NosCafe.png';
import ursum from './Pictures/nllp.jpg';
import gy from './Pictures/gym.png';
import graph from './Pictures/graphs.png';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Urdu Abstractive Text Summarization',
      description: 'Fine-tune a pretrained deep learning model to automatically generate concise summaries of Urdu talk show scripts.',
      detailDescription: (
        <div>
          <p>
            We developed a model to automatically generate concise and coherent summaries of Urdu talk show scripts.
            We fine-tuned the pre-trained model <span style={{ color: "purple" }}>"mirfan899/usum"</span> using a dataset of scripts and their corresponding summaries, 
            significantly enhancing the accuracy and quality of the summaries. The project involved creating a custom dataset, 
            implementing an efficient training process, and evaluating the model's performance using metrics like <span style={{ color: "purple" }}>ROUGE</span> and BERTScore. 
            The "mirfan899/usum" model is designed specifically for Urdu text summarization, making it highly effective for extracting key information from lengthy Urdu texts, 
            thereby saving time and improving content accessibility.
          </p>
        </div>
      ),
      languages: ["Python", "Transformers"],
      image: ursum,
      githubLink: "https://www.kaggle.com/code/messamnaqvi/urdu-abstractive-talk-show-text-summarization",
      liveLink: "https://www.kaggle.com/code/messamnaqvi/urdu-abstractive-talk-show-text-summarization",
      documentation: nlp,
    },
    {
      id: 2,
      title: "Gymi",
      description: "Gymi is a comprehensive MERN stack application designed for gym management and operations",
      detailDescription: (
        <div>
          <p>
            Gymi is a MERN (MongoDB, Express.js, React.js, Node.js) stack application tailored specifically for managing various 
            aspects of a <span style={{ color: "purple" }}>gym facility</span>. It offers a user-friendly interface for both administrators and members, allowing them to 
            efficiently handle tasks such as member management, class scheduling, inventory tracking, and financial reporting. 
            With its intuitive design and integration of Material-UI components, Gymi aims to streamline gym operations 
            and enhance the overall user experience. Whether it's managing memberships, organizing fitness classes, or analyzing 
            financial performance, Gymi provides a comprehensive solution for modern gym management needs.Utilizing the MERN stack and Material UI, Gymi provides a seamless
            and intuitive platform for managing gym operations efficiently.
          </p>
        </div>
      ),
      languages: ["React", "Express", "MongoDB", "Material UI"],
      image: gy,
      githubLink: "https://gymi-beta.vercel.app/home",
      liveLink: "https://gymi-beta.vercel.app/home",
      documentation: "./Documentation/Gymi.pdf",
    },
    {
      id: 3,
      title: 'Classification of Web Documents',
      description: <span style={{  }}>A graph-based extension of the k-Nearest Neighbors (k-NN) algorithm for classifying web document data, leveraging graph representations to capture structural and semantic information</span>,
      detailDescription: "Embarking on a different approach to document classification, this project enriches the k-Nearest Neighbors (k-NN) algorithm by harnessing graph-based techniques. Through graph representations, it encapsulates both structural and semantic nuances of documents, offering a holistic view for classification tasks. By employing graph-based distance measures, it enhances accuracy while preserving computational efficiency. This innovative methodology presents a paradigm shift from conventional vector-based methods, particularly beneficial in domains like text and document classification. With its ability to handle the inherent complexity of textual data, this project opens avenues for more nuanced and precise document analysis, promising significant advancements in classification accuracy and performance.",
      languages: ["Python"],
      image: graph,
      githubLink: "https://github.com/Messam-Naqvi/Graph_Base_KNN_Extension",
      liveLink: "https://github.com/Messam-Naqvi/Graph_Base_KNN_Extension",
      documentation: us,
    },
    {
      id: 4,
      title: "Snap Quiz",
      description: "Your innovative companion in turning your content into engaging quizzes",
      detailDescription: (
        <div>
          <p>
            SnapQuiz, a React and Python-powered project, empowers users to effortlessly
            create engaging quizzes from website content. Its user-friendly interface
            facilitates quiz creation for students and educators alike. With versatile
            features, SnapQuiz supports <span style={{ color: "purple" }}>Content and Website quizzes</span>, offering varying
            difficulty levels. Leveraging React for a responsive frontend and Python with
            Flask for efficient backend processing, SnapQuiz stands out for its
            adaptability and simplicity. Whether you're a student seeking interactive study
            tools or an educator aiming to enhance engagement, SnapQuiz streamlines the quiz 
            creation process.<span style={{ color: "purple" }}>Open-source</span> and collaborative, SnapQuiz invites contributions, 
            making it a valuable asset for educational advancement. Elevate your learning 
            experience with SnapQuiz!
          </p>
        </div>
      ),
      languages: ["React", "Flask","Bootstrap", "Python"],
      image: Snapquiz,
      githubLink: "https://github.com/Messam-Naqvi/SnapQuiz_Ai",
      liveLink: "https://github.com/Messam-Naqvi/SnapQuiz_Ai",
      documentation:Snap,
    },
    {
      id: 5,
      title: "Legal Link",
      description: "A legal practice management solution, optimizing efficiency and client handling through intuitive UI and integrated features",
      detailDescription: "Legal Link Desktop Application simplifies legal practice management, empowering lawyers to efficiently organize cases, schedule appointments, and track payments. With an intuitive user interface, it streamlines navigation and ensures ease of use. By integrating features like document handling and client organization, Legal Link enhances productivity and minimizes administrative tasks. Developed using SQL and C# technologies, it offers a seamless solution for legal professionals to manage their workload effectively. Whether it's tracking case details, managing client appointments, or handling financial transactions, Legal Link provides a user-friendly platform tailored to meet the unique needs of legal practitioners.",
      languages: ["C#", ".NET", "SQL"],
      image: legallink,
      githubLink: "#",
      liveLink: "#",
      documentation: legalink,
    },
    {
      id: 6,
      title: "Nostalgic Cafe",
      description: "A Windows Forms application that allows users to manage orders seamlessly. Users can easily place orders, add new items, and delete existing items.",
      detailDescription: "This C# Windows Forms application is designed to bring a touch of nostalgia to order management in cafes. Users can effortlessly place orders, add new items to the menu, and delete existing items, all through an intuitive and user-friendly interface. The application features a classic, nostalgic design that evokes the charm of traditional cafes while ensuring modern efficiency in managing orders. It streamlines the entire process, making it easier for cafe staff to handle customer requests and maintain an organized menu. With its blend of vintage aesthetics and practical functionality, the Nostalgic Cafe Order Management Application enhances the overall experience for both staff and customers, ensuring smooth and efficient cafe operations.",
      languages: ["C#", ".NET", "SQL"],
      image: noscafe,
      githubLink: "https://github.com/Messam-Naqvi/Nostaglic_Cafe_C-sharp-_WindowsApp_Desktop_App",
      liveLink: "https://github.com/Messam-Naqvi/Nostaglic_Cafe_C-sharp-_WindowsApp_Desktop_App",
      documentation: Cafee,
    }
  ];

  // State to manage which project details to show
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId === selectedProject ? null : projectId);
  };

  return (
    <>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          gutterBottom
          style={{ fontWeight: "bold", fontSize: "calc(20px + 2vw)", color: "white" }}
        >
          See my latest <span style={{ color: "purple" }}>works.</span>
        </Typography>
        <br />
        <br />
      </div>
      <Grid container spacing={1.9}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              style={{
                backgroundColor: "black",
                color: "white",
                position: "relative",
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              <CardMedia
                component="img"
                height="150"
                image={project.image}
                alt={project.title}
                style={{
                  objectFit: "cover",
                  width: "96%",
                  height: "350px",
                  borderRadius: "10px",
                  marginLeft: "10px",
                  marginTop: "0px",
                }}
              />
              <Drawer
                anchor="right"
                open={selectedProject === project.id}
                onClose={() => setSelectedProject(null)}
              >
                <div
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "20px",
                    width: "300px",
                    height: "110%",
                  }}
                >
                  <IconButton
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                    onClick={() => setSelectedProject(null)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold", fontSize: "1.7rem" }}
                  >
                    {project.title}
                  </Typography>
                  <br />
                  <Typography variant="body2" gutterBottom>
                    {project.detailDescription}
                  </Typography>
                  <br />
                  <Button
                    variant="outlined"
                    style={{
                      borderColor: "purple",
                      color: "white",
                      height: "40px",
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "purple",
                        color: "white",
                      },
                    }}
                    onClick={() => window.open(project.documentation, '_blank')}
                  >
                    View Documentation
                    <IconButton style={{ color: "white" }}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "white",
                        marginRight: "100px",
                        fontSize: "24px",
                      }}
                    >
                      <GitHubIcon fontSize="large" />
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "white",
                        marginLeft: "30px",
                        fontSize: "24px",
                      }}
                    >
                      <LaunchIcon fontSize="large" />
                    </a>
                  </div>
                </div>
              </Drawer>
              <CardContent
                style={{
                  opacity: hoveredProject === project.id ? 1 : 0,
                  transition: "opacity 0.4s ease-in-out",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor:
                    hoveredProject === project.id
                      ? "transparent"
                      : "rgba(0, 0, 0, 0)",
                  padding: "10px",
                  borderRadius: "0 0 10px 10px",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold", fontSize: "1.5rem", marginLeft: "11px" }}
                >
                  {project.title}
                </Typography>
                <Typography variant="body2" color="white" gutterBottom style={{ marginLeft: "11px" }}>
                  {project.description}
                </Typography>
                <div style={{ display: "flex", marginTop: "10px" }}>
                  {project.languages.map((language, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "purple",
                        color: "white",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        margin: "0 5px",
                      }}
                    >
                      {language}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
      <div style={{ textAlign: "center", marginRight: '120px' }}>
        <Button
          variant="outlined"
          href="https://github.com/Messam-Naqvi"
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderColor: "purple", color: "white", marginLeft: "120px" }}
          sx={{ '&:hover': { backgroundColor: 'purple', color: 'white' } }}
        >
          View All Projects
        </Button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Projects;
