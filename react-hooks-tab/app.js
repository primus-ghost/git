const { useState } = React;

const tabItems = [
  {
    id: 1,
    title: 'STEP 1',
    icon: 'tabitem__icon fas fa-child',
    content: 'step 1 content',
  },
  {
    id: 2,
    title: 'STEP 2',
    icon: 'tabitem__icon fas fa-users',
    content: 'step 2 content',
  },
  {
    id: 3,
    title: 'STEP 3',
    icon: 'tabitem__icon fas fa-network-wired',
    content: 'step 3 content',
  },
  {
    id: 4,
    title: 'STEP 4',
    icon: 'tabitem__icon fas fa-money-check-alt',
    content: 'step 4 content',
  },
];

const TabsComponent = () => {
 const [active, setActive] = useState(0);
  
  return (
    <div className="wrapper">
      <div className="tabs">
        {tabItems.map(({ id, icon, title }) =><TabItemComponent
           key={title}
           icon={icon}
           title={title}
           onItemClicked={() => setActive(id)}
           isActive={active === id}
         />
      )}
      </div>
      <div className="content">
        {tabItems.map(({ id, content }) => {
          return active === id ? content : ''
        })}
      </div>
     </div>
  )
}

const TabItemComponent = ({
  icon = '',
  title = '',
  onItemClicked = () => console.error('You passed no action to the component'),
  isActive = false,
}) => {
  return (
    <div className={isActive ? 'tabitem' : 'tabitem tabitem--inactive'} onClick={onItemClicked}>
      <i className={icon}></i>
      <p className="tabitem__title">{title}</p>
    </div>
  )
};

const mainNode = document.getElementById("app");
ReactDOM.render(<TabsComponent />, mainNode);
