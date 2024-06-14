
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Tag, message } from 'antd';
import axios from 'axios';
import ProjectModal from '../modal/project';
import Title from 'antd/es/skeleton/Title';
import { useNavigate } from 'react-router-dom';

interface DataType {
    tittle : string;
    description : string;
    status : string;
    loading : boolean;
    id : number,
    project: Object,
    action : string
}

const HomePage: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState({});
  const [ action, setAction ] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    axios.get( `http://localhost:5000/projects` ).then( done => {
        setData(done.data);
        setList(done.data);
    }).catch( error =>{
        message.warning("Failed to login")
    }).finally( () => {
        setInitLoading(false);
    })
  }

  const deleteProject = (data : { id : number }) =>{

    axios.delete( `http://localhost:5000/projects/${data.id}` ).then( done => {
        refresh();
    }).catch( () => {
        message.warning("Failed to delete the project")
    })

  }
  const changeProjectStatus = (data : { id : number, status : string }) =>{

    axios.put( `http://localhost:5000/projects/${data.status}/${data.id}` ).then( done => {
        refresh();
    }).catch( () => {
        message.warning("Failed to delete the project")
    })

  }


  const loadMore =
    (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button 
        onClick={()=> {
            setAction("create");
            setProject({});
            setIsModalOpen(true);
        }} 
        type='primary'>
            Create a new Project 
        </Button>

        <Button 
        danger
        onClick={()=> {
            navigate("/")
        }} 
        type='primary'>
            Logout the Portal
        </Button>
      </div>
    );

  return (
    <>
        <center>
            <List
            header={<div style={{ fontWeight : "bold", fontSize : 18 }}>All Projects</div>}
            className="demo-loadmore-list home-page"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                actions={[

                <Button  
                key="list-loadmore-edit"
                onClick={()=>{
                    setAction("edit")
                    setIsModalOpen(true);
                    setProject(item);
                }}
                >Edit</Button>, 

                item?.status === "PLANNING"?
                <Button 
                    key="list-loadmore-more" 
                    onClick={() => changeProjectStatus( { id : Number(item?.id), status: "INPROGRESS" } ) }
                    >Inprogress
                </Button> 
                :
                item?.status === "INPROGRESS" ?
                <Button 
                    key="list-loadmore-more" 
                    onClick={() => changeProjectStatus( { id : Number(item?.id), status : "COMPLETED" } ) }
                    >Complete
                </Button>
                :
                <Button>
                    Completed
                </Button>,

                <Button 
                    danger key="list-loadmore-more" 
                    onClick={() => deleteProject( { id : Number(item?.id) } ) }
                    >Delete
                </Button>

                ]}
                style={{ textAlign:"left"}}
                >
                <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                    avatar={<Avatar src={""} />}
                    title={<a href="https://ant.design">{item.tittle}</a>}
                    description={item?.description}
                    />
                    <Tag color='green'>{item?.status}</Tag>
                </Skeleton>
                </List.Item>
            )}
            />
        </center>
        <ProjectModal 
            
            isModalOpen={isModalOpen}
            setIsModalOpen={() => setIsModalOpen(!isModalOpen)}
            refresh = {refresh}
            project ={project}
            action={action}

        />
    </>
  );
};

export default HomePage;