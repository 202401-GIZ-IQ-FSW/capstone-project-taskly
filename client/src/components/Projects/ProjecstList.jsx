// client\src\components\Projects\ProjectList.jsx

const ProjectList = ({ selectedProject, projects, setSelectedProject }) => {
  return (
    <>
      <label htmlFor="projectSelect" className="mr-2 w-auto min-w-32">
        Choose project:
      </label>
      <select
        id="projectSelect"
        value={selectedProject ? selectedProject._id : ''}
        onChange={(e) => {
          // console.log(projects)
          const project = projects.find((p) => p._id == e.target.value);
          setSelectedProject(project);
          // console.log(project)
        }}
        className="p-2 border rounded min-w-52">
        <option value="" hidden>
          Select a project
        </option>
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default ProjectList;
