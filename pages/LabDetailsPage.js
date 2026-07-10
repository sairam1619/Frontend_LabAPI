import { labData } from "./LabData";

function LabDetailsPage({ type }) {

  const category = labData[type];
  const labs = category?.labs || [];
  const [search, setSearch] = React.useState("");
  const [selectedLab, setSelectedLab] = React.useState(labs[0]);
  const filteredLabs = labs.filter((lab) =>
    lab.name.toLowerCase().includes(search.toLowerCase()),
  );
  const [expandedSection, setExpandedSection] = React.useState(null);

  return (
    <div className="labs-page main-section">
      <div className="labs-header">
        <h2>{category.title}</h2>

        <p className="labs-description">
          {category.description}
        </p>
    </div>

      <div className="labs-search">
        <input
          className="labs-search-input"
          type="text"
          placeholder={category.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="labs-accordion">
  {filteredLabs.map((lab) => {
    const expanded = selectedLab.id === lab.id;

    return (
      <div key={lab.id} className="labs-accordion-item">
        <button
          className="labs-accordion-header"
          onClick={() => {
            if (expanded) {
              setSelectedLab({ id: -1 });
            } else {
              setSelectedLab(lab);
              setExpandedSection(null);
            }
          }}
        >
          <div>
            <div className="labs-card-title">{lab.name}</div>
            <div className="labs-card-subtitle">{lab.subtitle}</div>
          </div>

          <i
            className={
              expanded
                ? "bi bi-chevron-up"
                : "bi bi-chevron-down"
            }
          ></i>
        </button>

        {expanded && (
  <div className="labs-accordion-body">

    <div className="labs-details-header">
      <h3>{lab.name}</h3>
      <p>{lab.subtitle}</p>
    </div>

    <div className="labs-section">
      <h4>Overview</h4>
      <p>{lab.overview}</p>
    </div>

    <div className="labs-section">
      <h4>Learning Objectives</h4>

      <ul className="labs-list">
        {lab.objectives.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    <div className="labs-section">
      <h4>AWS Services</h4>

      <div className="labs-service-tags">
        {lab.services.map((service, index) => (
          <span key={index} className="labs-service-tag">
            {service}
          </span>
        ))}
      </div>
    </div>

    <div className="labs-section">
      <h4>Lab Sections</h4>

      <div className="labs-section-list">
        {lab.sections.map((section, index) => {
          const expandedSectionItem = expandedSection === index;

          return (
            <div
              key={index}
              className={
                expandedSectionItem
                  ? "labs-section-item expanded"
                  : "labs-section-item"
              }
            >
              <button
                className="labs-section-header"
                onClick={() =>
                  setExpandedSection(
                    expandedSectionItem ? null : index
                  )
                }
              >
                <div className="labs-section-left">
                  <span className="labs-section-number">
                    {index + 1}
                  </span>

                  <span className="labs-section-title">
                    {section.title}
                  </span>
                </div>

                <i
                  className={
                    expandedSectionItem
                      ? "bi bi-chevron-up nav-arrow"
                      : "bi bi-chevron-down nav-arrow"
                  }
                />
              </button>

              {expandedSectionItem && (
                <div className="labs-section-content">
                  <h5>Objective</h5>

                  <p>{section.objective}</p>

                  <h5>Tasks</h5>

                  <ul className="labs-list">
                    {section.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>

                  <h5>Outcome</h5>

                  <p>{section.outcome}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    <div className="labs-section">
      <h4>Common Issues</h4>

      <ul className="labs-list">
        {lab.issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
    </div>

    <div className="labs-actions">
      <button className="labs-doc-btn">
        Documentation
      </button>

      <button className="labs-launch-btn">
        Launch Lab
      </button>
    </div>

  </div>
)}
      </div>
    );
  })}
</div>
    </div>
    
  );
}
