import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { Iconify } from "src/components/iconify";
import { useGetKanbanBoard } from "../../actions";
import { useBoolean } from "minimal-shared/hooks";
import { NewTaskDialog } from "../../new-task-dialog";
import { useFetch } from "src/hooks/getters/use-fetch";
import { endpoints } from "src/lib/endpoints";
import { Box } from "@mui/material";

const SUBTASKS = [
  "Complete project proposal",
  "Conduct market research",
  "Design user interface mockups",
  "Develop backend api",
  "Implement authentication system",
];

export function TaskSubTasks({ parentTask, boardId }) {
  const { board } = useGetKanbanBoard(boardId);
  const [subtaskCompleted, setSubtaskCompleted] = useState(SUBTASKS.slice(0, 2));
  const [subTasks, setSubTasks] = useState([]);

  const { data: completion } = useFetch(endpoints.get.tasks.completion(parentTask.id));

  const newSubTaskDialog = useBoolean();

  useEffect(() => {
    if (board.tasks) {
      const currentColumnTasks = board.tasks[parentTask.column.id];

      const relatedTasks = currentColumnTasks.filter((t) => t.parentTask?.id === parentTask.id);

      console.log(currentColumnTasks);

      setSubTasks(relatedTasks);
    }
  }, [board.tasks, parentTask]);

  const handleClickSubtaskComplete = useCallback((taskId) => {
    setSubtaskCompleted((prev) =>
      prev.includes(taskId) ? prev.filter((value) => value !== taskId) : [...prev, taskId]
    );
  }, []);

  if (!completion) return null;

  return (
    <>
      {completion.totalSubTasks > 0 && (
        <div>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {completion.completedSubTasks} of {completion.totalSubTasks}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={(completion.completedSubTasks / completion.totalSubTasks) * 100}
          />
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderRadius: 1,
          px: 1.5,
          py: 0.5,
          overflow: "hidden",
          boxShadow: (theme) => theme.shadows[3],
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {subTasks.map((taskItem) => (
          <FormControlLabel
            key={taskItem.id}
            control={
              <Checkbox
                disableRipple
                name={taskItem.id}
                checked={subtaskCompleted.includes(taskItem.id)}
              />
            }
            label={taskItem.title}
            onChange={() => handleClickSubtaskComplete(taskItem.id)}
          />
        ))}
      </Box>

      <Button
        variant="outlined"
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ alignSelf: "flex-start" }}
        onClick={newSubTaskDialog.onTrue}
      >
        Yeni alt görev
      </Button>

      <NewTaskDialog
        open={newSubTaskDialog.value}
        onClose={newSubTaskDialog.onFalse}
        defaultColumnId={parentTask.column.id}
        parentTaskId={parentTask.id}
      />
    </>
  );
}
