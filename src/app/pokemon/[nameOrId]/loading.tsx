import { Container, Skeleton, Stack, Group } from "@mantine/core";

export default function Loading() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="md" mt={60}>
        <Skeleton height={220} width={220} circle />
        <Skeleton height={20} width={60} />
        <Skeleton height={36} width={200} />
        <Group gap="xs">
          <Skeleton height={28} width={80} radius="sm" />
          <Skeleton height={28} width={80} radius="sm" />
        </Group>
        <Skeleton height={400} width="100%" radius="md" mt="xl" />
      </Stack>
    </Container>
  );
}
